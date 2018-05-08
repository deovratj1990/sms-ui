import { Validation } from "./Validation";

export class MemberRegistrationForm {
    societyId: {
        validation: Validation,
        data: string;
    }
    roomId: {
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