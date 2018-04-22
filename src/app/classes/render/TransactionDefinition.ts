export class TransactionDefinition {
    id: number;
    chId: number;
    type: number ; //Credit/Debit
    applicableTo: number; //Account Type (Society | Member | Vendor | Customer)
    hasParticular: number;
    interval: number;
    amount: number;
    from: string;
    to: string;
}