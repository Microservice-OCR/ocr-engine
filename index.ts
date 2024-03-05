import { APIMaker } from "./api";
import { RecognizeController, RecognizeFromIdController } from "./controllers";
import { DefaultController } from "./controllers/default.controller";
let port:number;
let api:APIMaker|null = null

if(process.env.OCR_ENGINE_PORT === undefined){
    port = 3000;
}else{
    port = parseInt(process.env.OCR_ENGINE_PORT,10)
}

if(process.env.MODE === undefined || process.env.MODE === 'DEV'){
    console.log("OCR Engine is running on port "+port)
    api = new APIMaker(port)
}else if(process.env.MODE === 'PROD'){
    api = new APIMaker()
}

if(api !== null){
    api.SetupControllers([RecognizeController.getInstance(),RecognizeFromIdController.getInstance(),DefaultController.getInstance()])
    api.LaunchAPI()
}

// module.exports = api.app