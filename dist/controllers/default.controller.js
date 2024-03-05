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
exports.DefaultController = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class DefaultController {
    constructor() {
        this.path = "/";
    }
    static getInstance() {
        if (this.instance === undefined) {
            this.instance = new DefaultController();
        }
        return this.instance;
    }
    getBasic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json("no content");
        });
    }
    buildRoutes() {
        const router = express_1.default.Router();
        router.get('/', this.getBasic.bind(this));
        return router;
    }
}
exports.DefaultController = DefaultController;
