export type EmployeeFileType = 'passport_scan' | 'contract' | 'other';
export interface EmployeeFile {
    id: number;
    employee_id: number;
    file_id: number;
    file_type: EmployeeFileType;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
}
