import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateHrOperationDto } from './dto/create-hr_operation.dto';
import { UpdateHrOperationDto } from './dto/update-hr_operation.dto';
import { HrOperation } from './entities/hr_operation.entity';
import { createHrOperationSchema, updateHrOperationSchema } from './schemas/hr-operation.schema';

@Injectable()
export class HrOperationsService {
    constructor(private readonly db: DatabaseService) {}

    async create(dto: CreateHrOperationDto): Promise<HrOperation> {
        const { error, value } = createHrOperationSchema.validate(dto, { abortEarly: false });
        if (error) throw new Error(`Validation failed: ${error.message}`);

        const sql = `
            INSERT INTO hr_operations (
                employee_id,
                department_id,
                position_id,
                salary_amount,
                operation_type,
                user_id,
                performed_at,
                comment
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *
        `;

        const values = [
            dto.employee_id,
            dto.department_id || null,
            dto.position_id || null,
            dto.salary_amount || null,
            dto.operation_type,
            dto.user_id,
            dto.performed_at,
            dto.comment,
        ];

        const result = await this.db.query<HrOperation>(sql, values);
        return result[0];
    }

    async findAll(): Promise<HrOperation[]> {
        return this.db.query<HrOperation>(`SELECT * FROM hr_operations`);
    }

    async findOne(id: number): Promise<HrOperation | null> {
        const sql = `SELECT * FROM hr_operations WHERE id = $1`;
        const result = await this.db.query<HrOperation>(sql, [id]);
        return result[0] || null;
    }

    async update(id: number, dto: UpdateHrOperationDto): Promise<HrOperation | null> {
        const { error, value } = updateHrOperationSchema.validate(dto, { abortEarly: false });
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

        const sql = `
            UPDATE hr_operations
            SET ${fields.join(', ')}
            WHERE id = $${idx}
            RETURNING *
        `;

        values.push(id);

        const result = await this.db.query<HrOperation>(sql, values);
        return result[0] || null;
    }

    async remove(id: number): Promise<HrOperation | null> {
        const sql = `DELETE FROM hr_operations WHERE id = $1 RETURNING *`;
        const result = await this.db.query<HrOperation>(sql, [id]);
        return result[0] || null;
    }
}
