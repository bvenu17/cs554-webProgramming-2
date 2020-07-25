const uuid = require('uuid/v4');
const tasks = require('./task');
import { ObjectId } from "mongodb";


import { MongoHelper } from "../mongo.helper";

const comments = () => {
  return MongoHelper.client.db('Balaji-Venugopal-CS554-Lab1').collection('comment');
}

// const tasks = () => {
//   return MongoHelper.client.db('Balaji-Venugopal-CS554-Lab1').collection('tasks');
// }

const getCommentById = async (id: ObjectId): Promise<Object> => {
  const commentCollection: any = await comments();
  const comment: Object = await commentCollection.findOne({ _id: id });

  if (!comment) throw 'comment not found';
  return comment;
}

const addComment = async (name: string, comment: string, taskId: ObjectId) : Promise<Object>=> {
  console.log("hello");
  const commentCollection :any  = await comments();

  const newComment :any = {
    _id: uuid(),
    name: name,
    comment: comment
  };

  const newInsertInformation :any  = await commentCollection.insertOne(newComment);
  const newId : ObjectId = newInsertInformation.insertedId;

  await tasks.addCommentToTask(name, comment, newId, taskId);

  return await getCommentById(newId);
}

const removeComment = async (id : ObjectId, taskId: ObjectId) : Promise<Object> => {
  const commentCollection : any = await comments();
  const deletedComment : Object = await getCommentById(id);

  const deletionInfo :any = await commentCollection.removeOne({ _id: id });
  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete comment with id of ${id}`;
  }

  const retObj1 : Object= {
    deleted: true,
    data: deletedComment
  }
  await tasks.removeCommentFromTask(taskId, id);


  return retObj1;
}

module.exports = {
  addComment,
  getCommentById,
  removeComment
}