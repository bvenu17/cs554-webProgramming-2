
const uuid = require('uuid/v4');
import { ObjectId } from "mongodb";


import { MongoHelper } from "../mongo.helper";

const tasks = () => {
    return MongoHelper.client.db('Balaji-Venugopal-CS554-Lab1').collection('tasks');
  }

const getAllTasks = async (skip: any,take: any) :Promise<Array<Object>> => {
    const taskCollection : any = await tasks();
    const allTasks = await taskCollection.find({}).toArray();
    const retskipArr : Array<Object>  = [];
    const rettakeArr: Array<Object>  = [];
    const retbothArr: Array<Object>  = [];

     //skip = parseInt(skip);
   // take = parseInt(take);
    if (!allTasks) throw 'No tasks in system!';

    if(skip!=null&&take==null) {
      if(allTasks.length>20) {
      for(let i=skip;i<20;i++) {
        retskipArr.push(allTasks[i]);

      }} else {
        for(let i=skip;i<allTasks.length;i++) {
          retskipArr.push(allTasks[i]);
  
        }
      }
      return retskipArr;

    } else if(take!=null&&skip==null) {

      if(allTasks.length>take) {
      for(let i=0;i<take;i++) {
        rettakeArr.push(allTasks[i]);
      }} else {
        for(let i=0;i<allTasks.length;i++) {
          rettakeArr.push(allTasks[i]);
        }
      }
      return rettakeArr;
    } else if(skip!=null && take!=null) {
      let tot = parseInt(skip) + parseInt(take);
    // let tot = skip + take;
      console.log(tot);
      if(allTasks.length<tot){
      for(let i=skip;i<allTasks.length;i++) {
        retbothArr.push(allTasks[i]);
      }} else {
        for(let i=skip;i<tot;i++) {
          retbothArr.push(allTasks[i]);
        }
      }
      return retbothArr;
    } else {
      if(allTasks.length>20) {
      return allTasks.slice(0,20);
      } else {
        return allTasks;
      }
    }
    //console.log(retArr);
//    return retArr;
}


const getTaskById = async (id: ObjectId) : Promise<Object> => {
    const taskCollection :any  = await tasks();
    const task : Object = await taskCollection.findOne({_id: id});
    if (!task) throw 'task not found';
    return task;
}

const createTask = async (title : string,description : string,hoursEstimated : number,completed : boolean) : Promise<Object> => {
    const taskCollection : any = await tasks();

    let newTask : Object = {
        _id: uuid(),
        title:title,
        description:description,
        hoursEstimated:hoursEstimated,
        completed:completed,
        comments: []
    };

    const newInsertInformation : any = await taskCollection.insertOne(newTask);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    return await getTaskById(newInsertInformation.insertedId);
}

const removeTask = async (id: ObjectId) : Promise<Object> => {
    const taskCollection :any  = await tasks();
    const deletedObj : Object = await getTaskById(id)

    const deletionInfo :any  = await taskCollection.removeOne({_id: id});
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete task with id of ${id}`;
    }

    console.log(deletedObj);
    //await posts.removePost(deletedObj.posts.id);

    const retObj : Object = {
      deleted: true,
      data:deletedObj
    }
    return retObj;
}

const updateTask = async (id:ObjectId, newTask:any) : Promise<Object> => {
    console.log("yolo");
    const task : Object = await getTaskById(id);
    console.log(task);

    const taskCollection : any = await tasks();

    let updateTaskInfo = {
      title: newTask.title,
      description: newTask.description,
      hoursEstimated: newTask.hoursEstimated,
      completed: newTask.completed
    };

    const updateInfo = await taskCollection.updateOne({_id: id}, {$set: newTask});
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

    return await getTaskById(id);

 
}

const addCommentToTask = async (name : string,comment: string,commentId: ObjectId,taskId: ObjectId) : Promise<Object> => {
    let currentTask : Object = await getTaskById(taskId);
    console.log(currentTask);

    const taskCollection : any= await tasks();
    const updateInfo : any= await taskCollection.updateOne(
      {_id: taskId},
      {$addToSet: {comments: {id: commentId, name: name,comment:comment}}}
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

    return await getTaskById(taskId);
}

const removeCommentFromTask = async (taskId:ObjectId,commentId:ObjectId) : Promise<Object> => {
    let currentTask : Object = await getTaskById(taskId);
    console.log(currentTask);

    const taskCollection :any  = await tasks();
    const updateInfo: any = await taskCollection.updateOne({_id: taskId}, {$pull: {comments: {id: commentId}}});
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

    return await getTaskById(taskId);
}

module.exports = {
    createTask,
    getTaskById,
    getAllTasks,
    removeTask,
    updateTask,
    addCommentToTask,
    removeCommentFromTask
}