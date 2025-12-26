export interface User {
    id: number;
    last_name: string;
    first_name: string;
    patronymic: string | null;
    login: string;
    password_hash: string;
    role_id: number;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
}
