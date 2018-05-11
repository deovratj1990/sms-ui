import { AlertType } from "../enum/AlertType";
import { Validation } from "../io/Validation";

export class FormElement {
    activityType: { show: number, type: AlertType, text: string };
    validation: Array<Validation>;
}