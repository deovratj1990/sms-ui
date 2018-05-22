import { AlertType } from "../enum/AlertType";

export class Alert {
    type: AlertType = AlertType.SUCCESS;
    text: string = '';
}