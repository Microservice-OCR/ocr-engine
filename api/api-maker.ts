import express,{Express} from "express";
// const prometheus = require('express-prometheus-middleware');
import { ExpressController } from "./ExpressController.interface";

export class APIMaker{
    app:Express;
    controllers:ExpressController[]
    server: import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse> | undefined;
    constructor(){
        this.app = express();
        this.controllers = [];
    }

    SetupControllers = (_controllers:ExpressController[]):void=>{
        this.controllers = _controllers
    }

    private _buildRoutes = ():void=>{
        for(let controller of this.controllers){
            const router = controller.buildRoutes()
            // this.app.use('/metrics', prometheus({ metricsPath: '/metrics', collectDefaultMetrics: true }));
            this.app.use(controller.path,router)
        }
    }

    LaunchAPI = async ():Promise<void> => {
        this._buildRoutes();
    }

    CloseAPI = ():void=>{
        if(this.server == undefined)return;
        this.server.close();
        this.server = undefined;
    }
}