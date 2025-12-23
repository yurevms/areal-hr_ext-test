export class CreateHrOperationDto {
    employee_id: number;
    department_id?: number;
    position_id?: number;
    salary_amount?: number;
    operation_type: string;
    user_id: number;
    performed_at: string;
    comment: string;
}
