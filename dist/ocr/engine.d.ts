import { IRecognition } from './models';
import { IRectangle } from '../models';
export declare class Engine {
    worker: any;
    white_list: string;
    Setup: () => Promise<void>;
    Recognize: (imagePath: string) => Promise<IRecognition>;
    RecognizeComplex: (imagePath: string, rectangle: IRectangle) => Promise<IRecognition>;
    Terminate: () => Promise<void>;
}
