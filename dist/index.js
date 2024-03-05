"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
const controllers_1 = require("./controllers");
const default_controller_1 = require("./controllers/default.controller");
let port;
let api = null;
if (process.env.OCR_ENGINE_PORT === undefined) {
    port = 3000;
}
else {
    port = parseInt(process.env.OCR_ENGINE_PORT, 10);
}
if (process.env.MODE === undefined || process.env.MODE === 'DEV') {
    console.log("OCR Engine is running on port " + port);
    api = new api_1.APIMaker(port);
}
else if (process.env.MODE === 'PROD') {
    api = new api_1.APIMaker();
}
if (api !== null) {
    api.SetupControllers([controllers_1.RecognizeController.getInstance(), controllers_1.RecognizeFromIdController.getInstance(), default_controller_1.DefaultController.getInstance()]);
    api.LaunchAPI();
}
// module.exports = api.app
