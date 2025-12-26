import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateFileDto } from './dto/create-file.dto';
import { File } from './entities/file.entity';
import { UpdateFileDto} from "./dto/update-file.dto";
import { createFileSchema, updateFileSchema } from './schemas/files.schema';
import Joi from 'joi';

@Injectable()
export class FilesService {
    constructor(private readonly db: DatabaseService) {}

    async create(dto: CreateFileDto): Promise<File> {
        const { error, value } = createFileSchema.validate(dto, { abortEarly: false });
        if (error) throw new Error(`Validation failed: ${error.message}`);

        const sql = `
            INSERT INTO files (
                original_name,
                storage_name,
                mime_type,
                size,
                url,
                created_at
            )
            VALUES ($1, $2, $3, $4, $5, NOW())
            RETURNING *`;

        const values = [
            dto.original_name,
            dto.storage_name,
            dto.mime_type,
            dto.size,
            dto.url,
        ];

        const result = await this.db.query<File>(sql, values);
        return result[0];
    }

    async findAll(): Promise<File[]> {
        const sql = `SELECT * FROM files WHERE deleted_at IS NULL`;
        return this.db.query<File>(sql);
    }

    async findOne(id: number): Promise<File | null> {
        const sql = `SELECT * FROM files WHERE id = $1 AND deleted_at IS NULL`;
        const result = await this.db.query<File>(sql, [id]);
        return result[0] || null;
    }

    async update(id: number, dto: UpdateFileDto): Promise<File | null> {
        const { error, value } = updateFileSchema.validate(dto, { abortEarly: false });
        if (error) throw new Error(`Validation failed: ${error.message}`);

        const fields: string[] = [];
        const values: any[] = [];
        let idx = 1;

        for(const [key, value] of Object.entries(dto)){
            if(value !== undefined){
                fields.push(`${key} = $${idx++}`);
                values.push(value);
            }
        }

        if (fields.length === 0) {
            return this.findOne(id);
        }

        fields.push('updated_at = NOW()');

        const sql = `UPDATE files SET ${fields.join(', ')} WHERE id = $${idx} AND deleted_at IS NULL RETURNING *`;

        values.push(id);

        const result = await this.db.query<File>(sql, values);
        return result[0] || null;
    }


    async remove(id: number): Promise<File | null> {
        const sql = `
            UPDATE files
            SET deleted_at = NOW()
            WHERE id = $1
              AND deleted_at IS NULL
            RETURNING *
        `;
        const result = await this.db.query<File>(sql, [id]);
        return result[0] || null;
    }
}
