import { AlertType } from "../enum/AlertType";
import { Validation } from "../io/Validation";

export class ElementAlert {
    activityType: { show: number, type: AlertType, text: string };
    validation: Array<Validation>;
}