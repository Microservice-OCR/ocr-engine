import { Request, Response, Router } from "express";
import { ExpressController } from "../api";
export declare class DefaultController implements ExpressController {
    readonly path: string;
    static instance?: DefaultController;
    private constructor();
    static getInstance(): DefaultController;
    getBasic(req: Request, res: Response): Promise<void>;
    buildRoutes(): Router;
}
