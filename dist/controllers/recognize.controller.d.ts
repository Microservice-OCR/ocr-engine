import { Request, Response, Router } from "express";
import { Engine } from "../ocr";
import { ExpressController } from "../api";
export declare class RecognizeController implements ExpressController {
    readonly path: string;
    static instance?: RecognizeController;
    engine: Engine;
    private constructor();
    static getInstance(): RecognizeController;
    getBasic(req: Request, res: Response): Promise<void>;
    getReco(req: Request, res: Response): Promise<void>;
    getRecoComplex(req: Request, res: Response): Promise<void>;
    buildRoutes(): Router;
}
