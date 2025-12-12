export class CreateDepartmentDto {
    organization_id: number;
    parent_id?: number | null;
    name: string;
    comment: string;
}
