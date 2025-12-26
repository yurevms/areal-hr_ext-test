import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';
import { createUserSchema, updateUserSchema } from './schemas/user.schema';
import Joi from 'joi';

@Injectable()
export class UsersService {
    constructor(private readonly db: DatabaseService) {}

    async create(dto: CreateUserDto): Promise<User> {
        //валидация через JOI
        const { error, value } = createUserSchema.validate(dto, { abortEarly: false });
        if (error) throw new Error(`Validation failed: ${error.message}`);

        const passwordHash = await argon2.hash(dto.password, {type: argon2.argon2id,});

        const sql = `
      INSERT INTO users (
        last_name,
        first_name,
        patronymic,
        login,
        password_hash,
        role_id,
        created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING *
    `;

        const values = [
            dto.last_name,
            dto.first_name,
            dto.patronymic ?? null,
            dto.login,
            passwordHash,
            dto.role_id,
        ];

        const result = await this.db.query<User>(sql, values);
        return result[0];
    }

    async findAll(): Promise<User[]> {
        const sql = `
      SELECT *
      FROM users
      WHERE deleted_at IS NULL
      ORDER BY id
    `;

        return this.db.query<User>(sql);
    }

    async findOne(id: number): Promise<User | null> {
        const sql = `
      SELECT *
      FROM users
      WHERE id = $1
        AND deleted_at IS NULL
    `;

        const result = await this.db.query<User>(sql, [id]);
        return result[0] || null;
    }

    async update(id: number, dto: UpdateUserDto): Promise<User | null> {
        //валидация через JOI
        const { error, value } = updateUserSchema.validate(dto, { abortEarly: false });
        if (error) throw new Error(`Validation failed: ${error.message}`);

        const fields: string[] = [];
        const values: any[] = [];
        let idx = 1;

        if (dto.last_name !== undefined) {
            fields.push(`last_name = $${idx++}`);
            values.push(dto.last_name);
        }

        if (dto.first_name !== undefined) {
            fields.push(`first_name = $${idx++}`);
            values.push(dto.first_name);
        }

        if (dto.patronymic !== undefined) {
            fields.push(`patronymic = $${idx++}`);
            values.push(dto.patronymic);
        }

        if (dto.login !== undefined) {
            fields.push(`login = $${idx++}`);
            values.push(dto.login);
        }

        if (dto.password !== undefined) {
            const passwordHash = await argon2.hash(dto.password, {
                type: argon2.argon2id,
            });
            fields.push(`password_hash = $${idx++}`);
            values.push(passwordHash);
        }

        if (dto.role_id !== undefined) {
            fields.push(`role_id = $${idx++}`);
            values.push(dto.role_id);
        }

        if (fields.length === 0) {
            return this.findOne(id);
        }

        fields.push(`updated_at = NOW()`);

        const sql = `
      UPDATE users
      SET ${fields.join(', ')}
      WHERE id = $${idx}
        AND deleted_at IS NULL
      RETURNING *
    `;

        values.push(id);

        const result = await this.db.query<User>(sql, values);
        return result[0] || null;
    }

    async remove(id: number): Promise<User | null> {
        const sql = `
      UPDATE users
      SET deleted_at = NOW()
      WHERE id = $1
        AND deleted_at IS NULL
      RETURNING *
    `;

        const result = await this.db.query<User>(sql, [id]);
        return result[0] || null;
    }

    async findByLogin(login: string): Promise<User | null> {
        const result = await this.db.query<User>(
            `SELECT * FROM users WHERE login = $1 AND deleted_at IS NULL`,
            [login],
        );
        return result[0] || null;
    }

}
