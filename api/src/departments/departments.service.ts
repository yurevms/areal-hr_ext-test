import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { createDepartmentSchema, updateDepartmentSchema } from './schemas/departments.schema';
import Joi from 'joi';

@Injectable()
export class DepartmentsService {
    constructor(private db: DatabaseService) {}

    async findAll(): Promise<Department[]> {
        const result = await this.db.query<Department>(
            `SELECT * FROM departments WHERE deleted_at IS NULL`,
        );
        return result;
    }

    async findOne(id: number): Promise<Department | null> {
        const result = await this.db.query<Department>(
            `SELECT * FROM departments WHERE id=$1 AND deleted_at IS NULL`,
            [id],
        );
        return result[0] || null;
    }

    async create(dto: CreateDepartmentDto): Promise<Department> {
        //Валидация с помощью Joi
        const { error, value } = createDepartmentSchema.validate(dto, { abortEarly: false });
        if (error) throw new Error(`Validation failed: ${error.message}`);

        const result = await this.db.query<Department>(
            `INSERT INTO departments (organization_id, parent_id, name, comment, created_at)
       VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
            [dto.organization_id, dto.parent_id || null, dto.name, dto.comment],
        );
        return result[0];
    }

    async update(id: number, dto: UpdateDepartmentDto,): Promise<Department | null> {
        //валидация через Joi
        const { error, value } = updateDepartmentSchema.validate(dto, { abortEarly: false });
        if (error) throw new Error(`Validation failed: ${error.message}`);

        const fields: string[] = [];
        const values: any[] = [];
        let idx = 1;

        if (dto.organization_id !== undefined) {
            fields.push(`organization_id = $${idx++}`);
            values.push(dto.organization_id);
        }

        if (dto.parent_id !== undefined) {
            fields.push(`parent_id = $${idx++}`);
            values.push(dto.parent_id);
        }

        if (dto.name !== undefined) {
            fields.push(`name = $${idx++}`);
            values.push(dto.name);
        }

        if (dto.comment !== undefined) {
            fields.push(`comment = $${idx++}`);
            values.push(dto.comment);
        }

        if (fields.length === 0) {
            return this.findOne(id);
        }

        fields.push(`updated_at = NOW()`);

        const sql = `UPDATE departments SET ${fields.join(', ')} WHERE id = $${idx} AND deleted_at IS NULL RETURNING *`;
        values.push(id);

        const result = await this.db.query<Department>(sql, values);
        return result[0] || null;
    }

    async remove(id: number): Promise<Department | null> {
        const result = await this.db.query<Department>(
            `UPDATE departments SET deleted_at=NOW() WHERE id=$1 AND deleted_at IS NULL RETURNING *`,
            [id],
        );
        return result[0] || null;
    }
}
