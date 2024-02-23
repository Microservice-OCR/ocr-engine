"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
const controllers_1 = require("./controllers");
const default_controller_1 = require("./controllers/default.controller");
let port;
// if(process.env.OCR_ENGINE_PORT === undefined){
//     port = 80;
// }else{
//     port = parseInt(process.env.OCR_ENGINE_PORT,10)
// }
const api = new api_1.APIMaker();
api.SetupControllers([controllers_1.RecognizeController.getInstance(), controllers_1.RecognizeFromIdController.getInstance(), default_controller_1.DefaultController.getInstance()]);
api.LaunchAPI();
module.exports = api.app;
