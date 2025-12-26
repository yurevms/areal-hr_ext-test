import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateEmployeeFileDto } from './dto/create-employee_file.dto';
import { EmployeeFile } from './entities/employee_file.entity';
import { UpdateEmployeeFileDto} from "./dto/update-employee_file.dto";
import { createEmployeeFileSchema, updateEmployeeFileSchema } from './schemas/employee-files.schema';
import Joi from 'joi';

@Injectable()
export class EmployeeFilesService {
    constructor(private db: DatabaseService) {}

    async findOne(id: number): Promise<EmployeeFile | null> {
        const result = await this.db.query<EmployeeFile>(
            `SELECT * FROM employee_files WHERE id = $1 AND deleted_at IS NULL`, [id]);
        return result[0] || null;
    }

    async findAll(): Promise<EmployeeFile[]> {
        return this.db.query<EmployeeFile>(
            `SELECT * FROM employee_files WHERE deleted_at IS NULL`
        )
    }

    async findByEmployee(employeeId: number): Promise<EmployeeFile[]> {
        return this.db.query<EmployeeFile>(
            `SELECT * FROM employee_files WHERE employee_id = $1 AND deleted_at IS NULL`, [employeeId],);
    }

    async create(dto: CreateEmployeeFileDto): Promise<EmployeeFile> {
        const { error, value } = createEmployeeFileSchema.validate(dto, { abortEarly: false });
        if (error) throw new Error(`Validation failed: ${error.message}`);

        const result = await this.db.query<EmployeeFile>(
            `
            INSERT INTO employee_files (
                employee_id,
                file_id,
                file_type,
                created_at
            )
            VALUES ($1, $2, $3, NOW())
            RETURNING *
            `,
            [
                dto.employee_id,
                dto.file_id,
                dto.file_type,
            ],
        );

        return result[0];
    }

    async update(id: number, dto: UpdateEmployeeFileDto): Promise<EmployeeFile | null> {
        const { error, value } = updateEmployeeFileSchema.validate(dto, { abortEarly: false });
        if (error) throw new Error(`Validation failed: ${error.message}`);

        const fields: string[] = [];
        const values: any[] = [];
        let idx = 1;

        if (dto.file_type !== undefined) {
            fields.push(`file_type = $${idx++}`);
            values.push(dto.file_type);
        }

        if (fields.length === 0) {
            const result = await this.db.query<EmployeeFile>(
            `SELECT * FROM employee_files WHERE id = $1 AND deleted_at IS NULL`, [id]);
            return result[0] || null;
        }

        fields.push('updated_at = NOW()');

        const sql = `UPDATE employee_files SET ${fields.join(', ')} WHERE id = $${idx} AND deleted_at IS NULL RETURNING *`;

        values.push(id);

        const result = await this.db.query<EmployeeFile>(sql, values);
        return result[0] || null;
    }


    async remove(id: number): Promise<EmployeeFile | null> {
        const result = await this.db.query<EmployeeFile>(
            `UPDATE employee_files SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL RETURNING *`,
            [id],
        );

        return result[0] || null;
    }
}
