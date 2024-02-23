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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Engine = void 0;
const tesseract_js_1 = require("tesseract.js");
class Engine {
    constructor() {
        this.white_list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        this.Setup = () => __awaiter(this, void 0, void 0, function* () {
            this.worker = yield (0, tesseract_js_1.createWorker)('eng');
            // await this.worker.setParameters({
            //     tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            // });
        });
        this.Recognize = (imagePath) => __awaiter(this, void 0, void 0, function* () {
            const { data: { text } } = yield this.worker.recognize(imagePath);
            const output = {
                imagePath,
                fulltext: text
            };
            return output;
        });
        this.RecognizeComplex = (imagePath, rectangle) => __awaiter(this, void 0, void 0, function* () {
            const { data: { text } } = yield this.worker.recognize(imagePath, { rectangle: rectangle });
            console.log(text);
            const output = {
                imagePath,
                fulltext: text
            };
            return output;
        });
        this.Terminate = () => __awaiter(this, void 0, void 0, function* () {
            yield this.worker.terminate();
        });
    }
}
exports.Engine = Engine;
