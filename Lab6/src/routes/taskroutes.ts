import {Request, Response} from 'express';
import { ObjectId } from 'mongodb';
const data = require('../data');
const taskData = data.task;
const commentData = data.comments;




export class Tasks {
    public routes(app) : void {
      app.route('/api/tasks/:id').get(async (req: Request, res: Response) => {
        try {
          let task: Object = await taskData.getTaskById(req.params.id);
          res.status(200).json(task);
        } catch (e) {
          res.status(404).json({error: 'task not found'});
        }
      });
      
      app.route('/api/tasks').get(async (req: Request, res: Response) => {
        //console.log("get rt");
        try {
          let skip = req.query.skip;
          let take = req.query.take;
          let allTask : JSON = await taskData.getAllTasks(skip,take);
          res.status(200).json(allTask);
        } catch (e) {
          res.sendStatus(500);
        }
      });
      
      app.route('/api/tasks').post(async (req: Request, res: Response) => {
        let taskInfo : any = req.body;
      
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
          const newTask : Object = await taskData.createTask(taskInfo.title, taskInfo.description,taskInfo.hoursEstimated,taskInfo.completed);
          res.json(newTask);
        } catch (e) {
          res.sendStatus(500);
        }
      });
      
      app.route('/api/tasks/:id').put(async (req: Request, res: Response) => {
        console.log("put route");
        let taskInfo : any = req.body;
      
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
    
          const updatedTask : Object = await taskData.updateTask(req.params.id, taskInfo);
          res.json(updatedTask);
        } catch (e) {
          res.sendStatus(500);
        }
      });
    
      app.route('/api/tasks/:id').patch(async (req: Request, res: Response) => {
        console.log("patch route");
        let taskInfo : any = req.body;
      
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
    
          const updatedTask : Object = await taskData.updateTask(req.params.id, taskInfo);
          res.json(updatedTask);
        } catch (e) {
          res.sendStatus(500);
        }
      });
      
      app.route('/api/tasks/:id').delete(async (req: Request, res: Response) => {
        try {
          await taskData.getTaskById(req.params.id);
        } catch (e) {
          res.status(404).json({error: 'task not found'});
          return;
        }
      
        try {
          const removedTask : Object = await taskData.removeTask(req.params.id);
          res.json(removedTask);
          res.sendStatus(200);
        } catch (e) {
          res.sendStatus(500);
        }
      });
    
      app.route('/api/tasks/:id/comments').post(async (req: Request, res: Response) => {
        const data : any = req.body;
    
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
          const name : string= data.name;
          const comment: string = data.comment;
          const taskId   = req.params.id;
          //const {title, content, author} = blogPostData;
          const newComment : Object = await  commentData.addComment(name, comment, taskId);
          console.log("new comment "+newComment)
          res.json(newComment);
        } catch (e) {
          res.status(500).json({error: e});
        }
      });
    
      app.route('/api/tasks/:taskId/:commentId').delete(async (req: Request, res: Response) => {
        try {
          await commentData.getCommentById(req.params.commentId);
          console.log("getting comment to delete");
          //console.log(commentData);
        } catch (e) {
          res.status(404).json({error: 'comment not found'});
          //return;
        }
        try {
         //const removedComment : Object = await commentData.removeComment(ObjectId.createFromHexString(req.params.commentId),ObjectId.createFromHexString(req.params.taskId));
        const removedComment: Object = await commentData.removeComment(req.params.commentId,req.params.taskId);
        console.log("comment is deleting");
          console.log(removedComment);
        res.json(removedComment);
          res.sendStatus(200);
        } catch (e) {
          res.status(500).json({error: e});
        }
      });
      
    }
}