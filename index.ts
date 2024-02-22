import { APIMaker } from "./api";
import { RecognizeController, RecognizeFromIdController } from "./controllers";
import { DefaultController } from "./controllers/default.controller";

const api = new APIMaker()
api.SetupControllers([RecognizeController.getInstance(),RecognizeFromIdController.getInstance(),DefaultController.getInstance()])

module.exports = api.app