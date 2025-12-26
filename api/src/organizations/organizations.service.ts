import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { createOrganizationSchema, updateOrganizationSchema } from './schemas/organization.schema';

@Injectable()
export class OrganizationsService {
    constructor(private readonly db: DatabaseService) {}

    async findAll(): Promise<Organization[]> {
        return this.db.query<Organization>(
            `SELECT *
             FROM organizations
             WHERE deleted_at IS NULL`,
        );
    }

    async findOne(id: number): Promise<Organization | null> {
        const rows = await this.db.query<Organization>(
            `SELECT *
             FROM organizations
             WHERE id = $1
               AND deleted_at IS NULL`,
            [id],
        );

        return rows[0] || null;
    }

    async create(dto: CreateOrganizationDto): Promise<Organization> {
        const { error, value } = createOrganizationSchema.validate(dto, { abortEarly: false });
        if (error) throw new Error(`Validation failed: ${error.message}`);

        const rows = await this.db.query<Organization>(
            `
                INSERT INTO organizations (name, comment, created_at)
                VALUES ($1, $2, NOW())
                    RETURNING *
            `,
            [dto.name, dto.comment],
        );

        return rows[0];
    }

    async update(id: number, dto: UpdateOrganizationDto,): Promise<Organization | null> {
        const { error, value } = updateOrganizationSchema.validate(dto, { abortEarly: false });
        if (error) throw new Error(`Validation failed: ${error.message}`);

        const fields: string[] = [];
        const values: any[] = [];
        let idx = 1;

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

        const sql = `
            UPDATE organizations
            SET ${fields.join(', ')}
            WHERE id = $${idx}
              AND deleted_at IS NULL
                RETURNING *
        `;

        values.push(id);

        const rows = await this.db.query<Organization>(sql, values);
        return rows[0] || null;
    }

    async remove(id: number): Promise<Organization | null> {
        const rows = await this.db.query<Organization>(
            `
                UPDATE organizations
                SET deleted_at = NOW()
                WHERE id = $1
                  AND deleted_at IS NULL
                    RETURNING *
            `,
            [id],
        );

        return rows[0] || null;
    }
}
