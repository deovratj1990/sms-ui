import { Wings } from "./Wings";

export class SocietyRegistrationForm {
    name: string;
    wingCount: number;
    wings: Array<Wings>;
    secretary: {
        wing: string, 
        room: string , 
        mobile: string
    };
}