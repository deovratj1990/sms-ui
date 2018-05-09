import { Validation } from "./Validation";
import { AlertType } from "../enum/AlertType";

export class MemberRegistrationForm {
    societyId: {
        activityType: {show: number, type: AlertType, text: string},
        validation: Validation,
        data: string;
    }
    roomId: {
        activityType: {show: number, type: AlertType, text: string},
        validation: Validation,
        data: string;
    };
    name: {
        validation: Array<Validation>,
        data: string;
    };
    mobile: {
        validation: Array<Validation>,
        data: string;
    };
    password: {
        validation: Validation,
        data: string;
    };
    confirmPassword: {
        validation: Array<Validation>,
        data: string;
    };
}