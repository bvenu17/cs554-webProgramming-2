import * as express from 'express';
import { Request, Response } from 'express';
import { Tasks } from './routes/taskroutes';



class App {
    public app: express.Application;
    public taskRoutes: Tasks = new Tasks();
    public pathsAccessed: Object = {};

    constructor() {
        this.app = express();
        this.config();
        this.taskRoutes.routes(this.app);
    }

    LoggerOne = (req: Request, res: Response, next: Function) => {
        console.log('Request body:', req.body);
        console.log('Request url:', req.originalUrl);
        console.log("Http verb:", req.method);
        next()
    }

    LoggerTwo = (req: Request, res: Response, next: Function) => {
        if (!this.pathsAccessed[req.path]) this.pathsAccessed[req.path] = 0;
        this.pathsAccessed[req.path]++;
        console.log('There have now been ' + this.pathsAccessed[req.path] + ' requests made to ' + req.path);
        next();
    }


    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(this.LoggerOne);
        this.app.use(this.LoggerTwo);

    }


}

export default new App().app;
