export interface File {
    id: number;
    original_name: string;
    storage_name: string;
    mime_type: string;
    size: number;
    url: string;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
}
