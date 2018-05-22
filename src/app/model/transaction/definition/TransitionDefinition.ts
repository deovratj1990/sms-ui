import { CostHeader } from '../../cost-header/CostHeader';
import { TransactionParticular } from '../particular/TransactionParticular';

export class TransactionDefinition {
    id: number;
    costHeader: CostHeader;
    interval: number;
    transactionFrom: string; // Account Type (Society | Member | Vendor | Customer)
    transactionTo: string; // Account Type (Society | Member | Vendor | Customer)
    hasParticular: boolean = false;
    fromDate: string;
    particulars: Array<TransactionParticular> = new Array<TransactionParticular>();
    amount: number;

    constructor() {
        this.id = null;
        this.costHeader = {
            id: null,
            name: null
        };
        this.interval = null;
        this.transactionFrom = null;
        this.transactionTo = null;
        this.hasParticular = false;
        this.fromDate = null;
        this.particulars = [{
            id: null,
            costHeader: {
                id: null,
                name: null
            },
            amount: null
        }];
        this.amount = null;
    }
}
