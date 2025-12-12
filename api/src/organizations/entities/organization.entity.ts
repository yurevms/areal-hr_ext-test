export interface Organization {
    id: number;
    name: string;
    comment: string;
    created_at: Date;
    updated_at?: Date | null;
    deleted_at?: Date | null;
}