const mongoCollections = require('../config/mongoCollections');
const comments = mongoCollections.comment;
const tasks = require('./task');
const uuid = require('uuid/v4');

const getCommentById = async (id) => {
    const commentCollection = await comments();
    const comment = await commentCollection.findOne({_id: id});

    if (!comment) throw 'comment not found';
    return comment;
}

const addComment = async (name,comment,taskId) => {
    console.log("hello");
    const commentCollection = await comments();

    const newComment = {
      _id:uuid(),
      name: name,
      comment: comment  
    };

    const newInsertInformation = await commentCollection.insertOne(newComment);
    const newId = newInsertInformation.insertedId;

    await tasks.addCommentToTask(name, comment,newId,taskId);

    return await getCommentById(newId);
}

const removeComment = async (id,taskId) => {
    const commentCollection = await comments();
    const deletedComment = await getCommentById(id);

    const deletionInfo = await commentCollection.removeOne({_id: id});
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete comment with id of ${id}`;
    }

    const retObj1 = {
      deleted: true,
      data:deletedComment
    }
    await tasks.removeCommentFromTask(taskId, id);

    
    return retObj1;
}

module.exports = {
    addComment,
    getCommentById,
    removeComment
}