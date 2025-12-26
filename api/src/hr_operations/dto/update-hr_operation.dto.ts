export class UpdateHrOperationDto {
    employee_id?: number;
    department_id?: number | null;
    position_id?: number | null;
    salary_amount?: number | null;
    operation_type?: string;
    user_id?: number;
    performed_at?: string;
    comment?: string;
}
