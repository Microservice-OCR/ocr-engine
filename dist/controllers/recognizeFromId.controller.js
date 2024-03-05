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
exports.RecognizeFromIdController = void 0;
const express_1 = __importDefault(require("express"));
const ocr_1 = require("../ocr");
const dotenv_1 = require("dotenv");
const axios_1 = __importDefault(require("axios"));
(0, dotenv_1.config)();
class RecognizeFromIdController {
    constructor() {
        this.path = "/recognizeFromId";
        this.engine = new ocr_1.Engine();
    }
    static getInstance() {
        if (this.instance === undefined) {
            this.instance = new RecognizeFromIdController();
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
            const id = req.params['id'];
            const fullPath = `${process.env.SAVE_IMG_URI}/image/${id}`;
            console.log(fullPath);
            const response = yield axios_1.default.get(fullPath);
            const file = response.data;
            yield this.engine.Setup();
            const result = yield this.engine.Recognize(`${process.env.SAVE_IMG_URI}/images/${file.Path}`);
            file.Fulltext = result.fulltext;
            const response2 = yield axios_1.default.patch(`${process.env.SAVE_IMG_URI}/image/${id}`, file);
            yield this.engine.Terminate();
            res.json(result);
        });
    }
    getRecoComplex(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params['id'];
            const fullPath = `${process.env.SAVE_IMG_URI}/image/${id}`;
            console.log(fullPath);
            const response = yield axios_1.default.get(fullPath);
            const file = response.data;
            const input = req.body;
            const result = [];
            yield this.engine.Setup();
            for (let i = 0; i < input.inputs.length; i++) {
                const entry = yield this.engine.RecognizeComplex(`${process.env.SAVE_IMG_URI}/images/${file.Path}`, input.inputs[i].rectangle);
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
            file.Recognition = result;
            const response2 = yield axios_1.default.patch(`${process.env.SAVE_IMG_URI}/image/${id}`, file);
            yield this.engine.Terminate();
            res.json(result);
        });
    }
    buildRoutes() {
        const router = express_1.default.Router();
        router.get('/', this.getBasic.bind(this));
        router.post('/:id', express_1.default.json(), this.getRecoComplex.bind(this));
        router.get('/:id', this.getReco.bind(this));
        return router;
    }
}
exports.RecognizeFromIdController = RecognizeFromIdController;
