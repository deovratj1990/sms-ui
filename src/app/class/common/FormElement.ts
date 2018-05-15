import { AlertType } from "../enum/AlertType";
import { Validation } from "../../common/validation-error/model/Validation";

export class FormElement {
    activityType: { show: number, type: AlertType, text: string };
    validation: Array<Validation>;
}