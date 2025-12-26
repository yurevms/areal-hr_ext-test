import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { HistoryEntity } from './entities/history.entity';
import { createHistorySchema, updateHistorySchema } from './schemas/history.schema';

@Injectable()
export class HistoryService {
    constructor(private readonly db: DatabaseService) {}

    async create(dto: CreateHistoryDto): Promise<HistoryEntity> {
        const { error, value } = createHistorySchema.validate(dto, { abortEarly: false });
        if (error) throw new Error(`Validation failed: ${error.message}`);

        const sql = `
            INSERT INTO history (
                user_id,
                entity_type,
                entity_id,
                field_name,
                old_value,
                new_value,
                created_at
            )
            VALUES ($1, $2, $3, $4, $5, $6, NOW())
            RETURNING *
        `;

        const values = [
            dto.user_id,
            dto.entity_type,
            dto.entity_id,
            dto.field_name,
            dto.old_value || null,
            dto.new_value || null,
        ];

        const result = await this.db.query<HistoryEntity>(sql, values);
        return result[0];
    }

    async findAll(): Promise<HistoryEntity[]> {
        return this.db.query<HistoryEntity>(
            `SELECT * FROM history ORDER BY created_at DESC`,
        );
    }

    async findOne(id: number): Promise<HistoryEntity | null> {
        const result = await this.db.query<HistoryEntity>(
            `SELECT * FROM history WHERE id = $1`,
            [id],
        );
        return result[0] || null;
    }

    //поиск истории по сущности
    async findByEntity(
        entityType: string,
        entityId: number,
    ): Promise<HistoryEntity[]> {
        return this.db.query<HistoryEntity>(
            `
            SELECT *
            FROM history
            WHERE entity_type = $1
              AND entity_id = $2
            ORDER BY created_at DESC
            `,
            [entityType, entityId],
        );
    }

    async update(id: number, dto: UpdateHistoryDto,): Promise<HistoryEntity | null> {
        const { error, value } = updateHistorySchema.validate(dto, { abortEarly: false });
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
            UPDATE history
            SET ${fields.join(', ')}
            WHERE id = $${idx}
            RETURNING *
        `;

        values.push(id);

        const result = await this.db.query<HistoryEntity>(sql, values);
        return result[0] || null;
    }

    async remove(id: number): Promise<HistoryEntity | null> {
        const result = await this.db.query<HistoryEntity>(
            `DELETE FROM history WHERE id = $1 RETURNING *`,
            [id],
        );
        return result[0] || null;
    }
}
