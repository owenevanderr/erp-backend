export declare class CreateWorkOrderDto {
    productId: string;
    quantity: number;
    dueDate: string;
    assignedEmployeeId?: string;
    notes?: string;
}
export declare class UpdateWorkOrderStatusDto {
    status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';
}
