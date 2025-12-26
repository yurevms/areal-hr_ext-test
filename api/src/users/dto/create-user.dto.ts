export class CreateUserDto {
    last_name: string;
    first_name: string;
    patronymic?: string;
    login: string;
    password: string;
    role_id: number;
}
