import { TransactionParticular } from "../../particular/model/TransactionParticular";

export class TransactionDefinition {
    id: number;
    chId: number;
    holderType: number; //Account Type (Society | Member | Vendor | Customer)
    hasParticular: boolean = false;
    particulars: Array<TransactionParticular> = new Array<TransactionParticular>();
    interval: number;
    amount: number;
    from: string;
    to: string;
}
