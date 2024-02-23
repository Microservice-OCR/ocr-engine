import { APIMaker } from "./api";
import { RecognizeController, RecognizeFromIdController } from "./controllers";
import { DefaultController } from "./controllers/default.controller";
let port:number;

// if(process.env.OCR_ENGINE_PORT === undefined){
//     port = 3000;
// }else{
//     port = parseInt(process.env.OCR_ENGINE_PORT,10)
// }

const api = new APIMaker()
api.SetupControllers([RecognizeController.getInstance(),RecognizeFromIdController.getInstance(),DefaultController.getInstance()])
api.LaunchAPI()

// module.exports = api.app