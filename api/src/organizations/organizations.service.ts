import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { QueryResult } from 'pg';
import { DatabaseService } from '../database/database.service';
import {Organization} from "./entities/organization.entity";

@Injectable()
export class OrganizationsService {
    constructor(private db: DatabaseService) {}

    async findAll(): Promise<Organization[]> {
        const result: QueryResult<Organization> = await this.db.query(
            `SELECT * FROM organizations WHERE deleted_at IS NULL`,
        );
        return result.rows;
    }

    async findOne(id: number): Promise<Organization | null> {
        const result: QueryResult<Organization> = await this.db.query(
            `SELECT * FROM organizations WHERE id = $1 AND deleted_at IS NULL`,
            [id],
        );
        return result.rows[0] || null;
    }

    async create(dto: CreateOrganizationDto): Promise<Organization> {
        const result: QueryResult<Organization> = await this.db.query(
            `INSERT INTO organizations (name, comment, created_at) VALUES ($1, $2, NOW()) RETURNING *`,
            [dto.name, dto.comment],
        );
        return result.rows[0];
    }

    async update(id: number, dto: UpdateOrganizationDto,): Promise<Organization | null> {
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

        const sql = `UPDATE organizations SET ${fields.join(', ')} WHERE id = $${idx} AND deleted_at IS NULL RETURNING *`;

        values.push(id);
        const result = await this.db.query<Organization>(sql, values);
        return result[0] || null;
    }


    async remove(id: number): Promise<Organization | null> {
        const result: QueryResult<Organization> = await this.db.query(
            `UPDATE organizations SET deleted_at=NOW() WHERE id=$1 AND deleted_at IS NULL RETURNING *`,
            [id],
        );
        return result.rows[0] || null;
    }
}
