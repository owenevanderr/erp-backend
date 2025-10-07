export declare class CreateTransactionDto {
    type: 'CASH_IN' | 'CASH_OUT';
    amount: number;
    description?: string;
    customerId?: string;
    supplierId?: string;
}
