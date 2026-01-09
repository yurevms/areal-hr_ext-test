import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {User} from "../users/entities/user.entity";
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(login: string, password: string): Promise<User | null> {
        const user = await this.usersService.findByLogin(login);

        if (!user) {
            return null;
        }

        const isPasswordValid = await argon2.verify(
            user.password_hash,
            password,
        );

        if (!isPasswordValid) {
            return null;
        }

        return user;
    }
}
