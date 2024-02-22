import { APIMaker } from "./api";
import { RecognizeController, RecognizeFromIdController } from "./controllers";

const api = new APIMaker()
api.SetupControllers([RecognizeController.getInstance(),RecognizeFromIdController.getInstance()])

module.exports = api.app