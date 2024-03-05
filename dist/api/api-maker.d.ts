/// <reference types="node" />
import { Express } from "express";
import { ExpressController } from "./ExpressController.interface";
export declare class APIMaker {
    app: Express;
    controllers: ExpressController[];
    port?: number;
    server: import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse> | undefined;
    constructor(_port?: number);
    SetupControllers: (_controllers: ExpressController[]) => void;
    private _buildRoutes;
    LaunchAPI: () => Promise<void>;
    CloseAPI: () => void;
}
