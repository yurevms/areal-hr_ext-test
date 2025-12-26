export class UpdateDepartmentDto {
    organization_id?: number;
    parent_id?: number | null;
    name?: string;
    comment?: string;
}