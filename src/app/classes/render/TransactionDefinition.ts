import { Particular } from "../io/Particular";

export class TransactionDefinition {
    id: number;
    chId: number;
    type: number ; //Credit/Debit
    applicableTo: number; //Account Type (Society | Member | Vendor | Customer)
    hasParticular: boolean = false;
    particulars: Array<Particular> = new Array<Particular>();
    interval: number;
    amount: number;
    from: string;
    to: string;
}