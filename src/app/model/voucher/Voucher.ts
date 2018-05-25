export class Voucher {
    id: number;
    transactionDefinition: {
        id: number,
        name: string
    };
    transactionFrom: Array<{
        id: number,
        name: string
    }>;
    balanceAmount: number;
    date: string;
    paymentAmount: number;
    paymentType: number;
    paymentDetail: string;

    constructor() {
        this.id = null;
        this.transactionDefinition = {
            id: null,
            name: null
        };
        this.transactionFrom = [{
            id: null,
            name: null
        }];
        this.balanceAmount = null;
        this.date = null;
        this.paymentAmount = null;
        this.paymentType = null;
        this.paymentDetail = null;
        }

}