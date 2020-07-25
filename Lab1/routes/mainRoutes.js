const express = require('express');
const router = express.Router();
const mongoCollections = require('../config/mongoCollections');

const tasks = mongoCollections.task;

const data = require('../data');
const taskData = data.task;
const commentData = data.comments;

router.get('/api/tasks/:id', async (req, res) => {
    try {
      let task = await taskData.getTaskById(req.params.id);
      res.json(task);
    } catch (e) {
      res.status(404).json({error: 'task not found'});
    }
  });
  
  router.get('/api/tasks', async (req, res) => {
    console.log("get rt");
    try {
      let skip = req.query.skip;
      let take = req.query.take;
      let allTask = await taskData.getAllTasks(skip,take);
      res.json(allTask);
    } catch (e) {
      res.sendStatus(500);
    }
  });
  
  router.post('/api/tasks', async (req, res) => {
    let taskInfo = req.body;
  
    if (!taskInfo) {
      res.status(400).json({error: 'You must provide data to create a task'});
      return;
    }
  
    if (!taskInfo.title||typeof taskInfo.title!='string') {
      res.status(400).json({error: 'You must provide a proper title'});
      return;
    }
  
    if (!taskInfo.description||typeof taskInfo.description!='string') {
      res.status(400).json({error: 'You must provide a proper description'});
      return;
    }

    if (!taskInfo.hoursEstimated||typeof taskInfo.hoursEstimated!='number') {
      res.status(400).json({error: 'You must provide a number'});
      return;
    }

    if (taskInfo.completed==null||typeof taskInfo.completed!='boolean') {
      res.status(400).json({error: 'You must provide a boolean'});
      return;
    }
  
    try {
      const newTask = await taskData.createTask(taskInfo.title, taskInfo.description,taskInfo.hoursEstimated,taskInfo.completed);
      res.json(newTask);
    } catch (e) {
      res.sendStatus(500);
    }
  });
  
  router.put('/api/tasks/:id', async (req, res) => {
    console.log("put route");
    let taskInfo = req.body;
  
    if (!taskInfo) {
      res.status(400).json({error: 'You must provide data to update a task'});
      return;
    }
    if(!taskInfo.title || !taskInfo.description || !taskInfo.hoursEstimated || taskInfo.completed==null) {
      res.status(400).json({error: 'You must provide all data to update a task'});
      return;
    }

    if(typeof taskInfo.title !== 'string'||typeof taskInfo.description !== 'string') {
      res.status(400).json({error: 'title or desc are not of correct type'});
      return;
    }

    if(typeof taskInfo.hoursEstimated !== 'number') {
      res.status(400).json({error: 'hours estimated are not of correct type'});
      return;
    }

    if(typeof taskInfo.completed !== 'boolean') {
      res.status(400).json({error: 'completed value are not of correct type'});
      return;
    }
  
    try {
      console.log("check");
      await taskData.getTaskById(req.params.id);
    } catch (e) {
      res.status(404).json({error: 'task not found'});
      return;
    }
    try {

      const updatedTask = await taskData.updateTask(req.params.id, taskInfo);
      res.json(updatedTask);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  router.patch('/api/tasks/:id', async (req, res) => {
    console.log("put route");
    let taskInfo = req.body;
  
    if (!taskInfo) {
      res.status(400).json({error: 'You must provide data to update a user'});
      return;
    }

    // if(!taskInfo.title && !taskInfo.description && !taskInfo.hoursEstimated && !taskInfo.completed) {
    //   res.status(400).json({error: 'You must provide some data to update a task'});
    //   return;
    // }
    
    if(taskInfo.title && typeof taskInfo.title !== 'string') {
      res.status(400).json({error: 'title  are not of correct type'});
      return;
    }

    if(taskInfo.description && typeof taskInfo.description !== 'string') {
      res.status(400).json({error: 'desc  are not of correct type'});
      return;
    }

    if(taskInfo.hoursEstimated && typeof taskInfo.hoursEstimated !== 'number') {
      res.status(400).json({error: 'hours estimated are not of correct type'});
      return;
    }

    if(taskInfo.completed && typeof taskInfo.completed !== 'boolean') {
      res.status(400).json({error: 'completed value are not of correct type'});
      return;
    }
    try {
      console.log("check");
      await taskData.getTaskById(req.params.id);
    } catch (e) {
      res.status(404).json({error: 'task not found'});
      return;
    }
    try {

      const updatedTask = await taskData.updateTask(req.params.id, taskInfo);
      res.json(updatedTask);
    } catch (e) {
      res.sendStatus(500);
    }
  });
  
  router.delete('/api/tasks/:id', async (req, res) => {
    try {
      await taskData.getTaskById(req.params.id);
    } catch (e) {
      res.status(404).json({error: 'task not found'});
      return;
    }
  
    try {
      const removedTask = await taskData.removeTask(req.params.id);
      res.json(removedTask);
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  router.post('/api/tasks/:id/comments', async (req, res) => {
    const data = req.body;

    if (!data) {
      res.status(400).json({error: 'You must provide data to create a comment'});
      return;
    }

    if(!data.name||typeof data.name!='string') {
      res.status(400).json({error: 'You must provide  name in a comment'});
      return;
    }

    if(!data.comment||typeof data.comment!='string') {
      res.status(400).json({error: 'You must provide data forcomment'});
      return;
    }


      try {
      const name= data.name;
      const comment = data.comment;
      const taskId = req.params.id;
      //const {title, content, author} = blogPostData;
      const newComment = await  commentData.addComment(name, comment, taskId);
      console.log("new comment "+newComment)
      res.json(newComment);
    } catch (e) {
      res.status(500).json({error: e});
    }
  });

  router.delete('/api/tasks/:taskId/:commentId', async (req, res) => {
    try {
      await commentData.getCommentById(req.params.commentId);
    } catch (e) {
      res.status(404).json({error: 'comment not found'});
      return;
    }
    try {
      const removedComment = await commentData.removeComment(req.params.commentId,req.params.taskId);
      res.json(removedComment);
      res.sendStatus(200);
    } catch (e) {
      res.status(500).json({error: e});
    }
  });
  

module.exports = router;