import { FormElement } from "../common/FormElement";

export class SocietyRegistrationAlert {
    name: FormElement;
    wingCount: FormElement;
    wings: {
        name: FormElement,
        room: FormElement
    };
    secretary: {
        wing: FormElement,
        room: FormElement,
        mobile: FormElement
    };
}