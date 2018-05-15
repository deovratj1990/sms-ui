import { AlertType } from "../enum/AlertType";
import { Validation } from "../../common/validation-error/model/Validation";

export class ElementAlert {
    activityType: { show: number, type: AlertType, text: string };
    validation: Array<Validation>;
}