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
exports.RecognizeController = void 0;
const express_1 = __importDefault(require("express"));
const ocr_1 = require("../ocr");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class RecognizeController {
    constructor() {
        this.path = "/recognize";
        this.engine = new ocr_1.Engine();
    }
    static getInstance() {
        if (this.instance === undefined) {
            this.instance = new RecognizeController();
        }
        return this.instance;
    }
    getBasic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json("no content");
        });
    }
    getReco(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = req.params['path'];
            const fullPath = `${process.env.SAVE_IMG_URI}/images/${path}`;
            console.log(fullPath);
            yield this.engine.Setup();
            const result = yield this.engine.Recognize(fullPath);
            yield this.engine.Terminate();
            res.json(result);
        });
    }
    getRecoComplex(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = req.params['path'];
            const fullPath = `${process.env.SAVE_IMG_URI}/images/${path}`;
            console.log(fullPath);
            const input = req.body;
            const result = [];
            yield this.engine.Setup();
            for (let i = 0; i < input.inputs.length; i++) {
                const entry = yield this.engine.RecognizeComplex(`${process.env.SAVE_IMG_URI}/images/${path}`, input.inputs[i].rectangle);
                const name = input.inputs[i].name;
                result.push({
                    [name]: {
                        value: entry.fulltext,
                        top: input.inputs[i].rectangle.top,
                        left: input.inputs[i].rectangle.left,
                        width: input.inputs[i].rectangle.width,
                        height: input.inputs[i].rectangle.height
                    }
                });
            }
            yield this.engine.Terminate();
            res.json(result);
        });
    }
    buildRoutes() {
        const router = express_1.default.Router();
        router.get('/', this.getBasic.bind(this));
        router.get('/:path', this.getReco.bind(this));
        router.post('/:path', express_1.default.json(), this.getRecoComplex.bind(this));
        return router;
    }
}
exports.RecognizeController = RecognizeController;
