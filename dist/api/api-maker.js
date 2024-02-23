"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIMaker = void 0;
const express_1 = __importDefault(require("express"));
class APIMaker {
    constructor() {
        this.SetupControllers = (_controllers) => {
            this.controllers = _controllers;
        };
        this._buildRoutes = () => {
            for (let controller of this.controllers) {
                const router = controller.buildRoutes();
                // this.app.use('/metrics', prometheus({ metricsPath: '/metrics', collectDefaultMetrics: true }));
                this.app.use(controller.path, router);
            }
        };
        this.LaunchAPI = () => __awaiter(this, void 0, void 0, function* () {
            this._buildRoutes();
            this.app.listen();
        });
        this.CloseAPI = () => {
            if (this.server == undefined)
                return;
            this.server.close();
            this.server = undefined;
        };
        this.app = (0, express_1.default)();
        this.controllers = [];
    }
}
exports.APIMaker = APIMaker;
