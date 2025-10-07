export declare class CreateProductDto {
    name: string;
    sku: string;
    unit: string;
    stock?: number;
    lowStockThreshold?: number;
    supplierId?: string;
}
export declare class UpdateProductDto {
    name?: string;
    unit?: string;
    stock?: number;
    lowStockThreshold?: number;
    supplierId?: string;
}
export declare class StockMovementDto {
    quantity: number;
}
