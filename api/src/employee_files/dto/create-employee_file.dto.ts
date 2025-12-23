export class CreateEmployeeFileDto {
    employee_id: number;
    file_id: number;
    file_type: 'passport_scan' | 'contract' | 'other';
}
