import { Request, Response, Router } from "express";
import { Engine } from "../ocr";
import { ExpressController } from "../api";
export declare class RecognizeFromIdController implements ExpressController {
    readonly path: string;
    static instance?: RecognizeFromIdController;
    engine: Engine;
    private constructor();
    static getInstance(): RecognizeFromIdController;
    getBasic(req: Request, res: Response): Promise<void>;
    getReco(req: Request, res: Response): Promise<void>;
    getRecoComplex(req: Request, res: Response): Promise<void>;
    buildRoutes(): Router;
}
