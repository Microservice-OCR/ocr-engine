import express, { Request, Response, Router } from "express";
import { Engine } from "../ocr";
import { config } from "dotenv";
import * as fs from 'fs'
import { ExpressController } from "../api";
import { IComplexRecognition, IRecognition } from "../ocr/models";
import { IInput } from "../models";
config()

export class DefaultController implements ExpressController{  

    readonly path: string;
    public static instance?:DefaultController

    private constructor(){
        this.path = "/";
    }
    
    public static getInstance():DefaultController{
        if(this.instance === undefined){
            this.instance = new DefaultController();
        }
        return this.instance;
    }

    async getBasic(req:Request,res:Response):Promise<void>{
        res.json("no content")
    }

    buildRoutes(): Router {
        const router = express.Router();        
        router.get('/', this.getBasic.bind(this));
        return router;
    }
}