export interface Department {
    id: number;
    organization_id: number;
    parent_id?: number | null;
    name: string;
    comment: string;
    created_at: Date;
    updated_at?: Date | null;
    deleted_at?: Date | null;
}
