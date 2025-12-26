import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { createEmployeeSchema, updateEmployeeSchema } from './schemas/employees.schema';
import Joi from 'joi';

@Injectable()
export class EmployeesService {
    constructor(private db: DatabaseService) {}

    async findAll(): Promise<Employee[]> {
        return this.db.query<Employee>(
            `SELECT * FROM employees WHERE deleted_at IS NULL`,
        );
    }

    async findOne(id: number): Promise<Employee | null> {
        const result = await this.db.query<Employee>(
            `SELECT * FROM employees WHERE id = $1 AND deleted_at IS NULL`,
            [id],
        );
        return result[0] || null;
    }

    async create(dto: CreateEmployeeDto): Promise<Employee> {
        const { error, value } = createEmployeeSchema.validate(dto, { abortEarly: false });
        if (error) throw new Error(`Validation failed: ${error.message}`);

        const sql = `
            INSERT INTO employees (
                last_name, first_name, patronymic,
                birth_date,
                pasport_series, pasport_number, pasport_date_of_issue, pasport_unit_code, pasport_issued_by,
                address_area, address_city, address_street, address_house, address_building, address_apartment,
                created_at)
            VALUES (
                $1, $2, $3,
                $4,
                $5, $6, $7, $8, $9,
                $10, $11, $12, $13, $14, $15,
                NOW())
            RETURNING *`;

        const values: any[] = [
            dto.last_name,
            dto.first_name,
            dto.patronymic || null,
            dto.birth_date,
            dto.pasport_series,
            dto.pasport_number,
            dto.pasport_date_of_issue,
            dto.pasport_unit_code,
            dto.pasport_issued_by,
            dto.address_area,
            dto.address_city,
            dto.address_street,
            dto.address_house,
            dto.address_building || null,
            dto.address_apartment || null,
        ];

        const result = await this.db.query<Employee>(sql, values);
        return result[0];
    }

    async update(id: number, dto: UpdateEmployeeDto): Promise<Employee | null> {
        const { error, value } = updateEmployeeSchema.validate(dto, { abortEarly: false });
        if (error) throw new Error(`Validation failed: ${error.message}`);

        const fields: string[] = [];
        const values: any[] = [];
        let idx = 1;

        for (const [key, value] of Object.entries(dto)) {
            if (value !== undefined) {
                fields.push(`${key} = $${idx++}`);
                values.push(value);
            }
        }

        if (fields.length === 0) {
            return this.findOne(id);
        }

        fields.push('updated_at = NOW()');

        const sql = `
            UPDATE employees
            SET ${fields.join(', ')}
            WHERE id = $${idx}
              AND deleted_at IS NULL
            RETURNING *
        `;

        values.push(id);

        const result = await this.db.query<Employee>(sql, values);
        return result[0] || null;
    }

    async remove(id: number): Promise<Employee | null> {
        const result = await this.db.query<Employee>(
            `
            UPDATE employees
            SET deleted_at = NOW()
            WHERE id = $1
              AND deleted_at IS NULL
            RETURNING *
            `,
            [id],
        );

        return result[0] || null;
    }
}
