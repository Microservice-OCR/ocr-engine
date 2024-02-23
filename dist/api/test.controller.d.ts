import { ExpressController } from ".";
import { Request, Response, Router } from "express";
export declare class TestController implements ExpressController {
    readonly path: string;
    constructor();
    getBasic(req: Request, res: Response): Promise<void>;
    buildRoutes(): Router;
}
