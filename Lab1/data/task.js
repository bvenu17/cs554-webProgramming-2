const mongoCollections = require('../config/mongoCollections');
const tasks = mongoCollections.task;

const uuid = require('uuid/v4');

const getAllTasks = async (skip,take) => {
    const taskCollection = await tasks();
    const allTasks = await taskCollection.find({}).toArray();
    const retskipArr = [];
    const rettakeArr = [];
    const retbothArr = [];


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


const getTaskById = async (id) => {
    const taskCollection = await tasks();
    const task = await taskCollection.findOne({_id: id});
    if (!task) throw 'task not found';
    return task;
}

const createTask = async (title,description,hoursEstimated,completed) => {
    const taskCollection = await tasks();

    let newTask = {
        _id: uuid(),
        title:title,
        description:description,
        hoursEstimated:hoursEstimated,
        completed:completed,
        comments: []
    };

    const newInsertInformation = await taskCollection.insertOne(newTask);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    return await getTaskById(newInsertInformation.insertedId);
}

const removeTask = async (id) => {
    const taskCollection = await tasks();
    const deletedObj = await getTaskById(id)

    const deletionInfo = await taskCollection.removeOne({_id: id});
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete task with id of ${id}`;
    }

    console.log(deletedObj);
    //await posts.removePost(deletedObj.posts.id);

    const retObj = {
      deleted: true,
      data:deletedObj
    }
    return retObj;
}

const updateTask = async (id, newTask) => {
    console.log("yolo");
    const task = await getTaskById(id);
    console.log(task);

    const taskCollection = await tasks();

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

const addCommentToTask = async (name,comment,commentId,taskId) => {
    let currentTask = await getTaskById(taskId);
    console.log(currentTask);

    const taskCollection = await tasks();
    const updateInfo = await taskCollection.updateOne(
      {_id: taskId},
      {$addToSet: {comments: {id: commentId, name: name,comment:comment}}}
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

    return await getTaskById(taskId);
}

const removeCommentFromTask = async (taskId,commentId) => {
    let currentTask = await getTaskById(taskId);
    console.log(currentTask);

    const taskCollection = await tasks();
    const updateInfo = await taskCollection.updateOne({_id: taskId}, {$pull: {comments: {id: commentId}}});
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