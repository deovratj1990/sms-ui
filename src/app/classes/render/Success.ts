import { SuccessFlag } from "../enum/SuccessFlag";

export class Success {
    flag: SuccessFlag; //1-pending, 2-success, 3-failure
    message: string;
}