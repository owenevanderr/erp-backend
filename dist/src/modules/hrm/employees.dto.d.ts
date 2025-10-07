export declare class CreateEmployeeDto {
    name: string;
    position: string;
    salary: number;
}
export declare class UpdateEmployeeDto {
    name?: string;
    position?: string;
    salary?: number;
}
export declare class AttendanceDto {
    employeeId: string;
    date: string;
    status: 'PRESENT' | 'ABSENT';
}
export declare class GeneratePayrollDto {
    employeeId: string;
    month: number;
    year: number;
}
