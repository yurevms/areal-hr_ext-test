import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
    constructor(private db: DatabaseService) {}

    async findAll(): Promise<Department[]> {
        const result = await this.db.query<Department>(
            'SELECT * FROM departments WHERE deleted_at IS NULL',
        );
        return result;
    }

    async findOne(id: number): Promise<Department | null> {
        const result = await this.db.query<Department>(
            'SELECT * FROM departments WHERE id=$1 AND deleted_at IS NULL',
            [id],
        );
        return result[0] || null;
    }

    async create(dto: CreateDepartmentDto): Promise<Department> {
        const result = await this.db.query<Department>(
            `INSERT INTO departments (organization_id, parent_id, name, comment, created_at)
       VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
            [dto.organization_id, dto.parent_id || null, dto.name, dto.comment],
        );
        return result[0];
    }

    async update(id: number, dto: UpdateDepartmentDto): Promise<Department | null> {
        const result = await this.db.query<Department>(
            `UPDATE departments SET organization_id=$1, parent_id=$2, name=$3, comment=$4, updated_at=NOW()
       WHERE id=$5 RETURNING *`,
            [dto.organization_id, dto.parent_id || null, dto.name, dto.comment, id],
        );
        return result[0] || null;
    }

    async remove(id: number): Promise<Department | null> {
        const result = await this.db.query<Department>(
            'UPDATE departments SET deleted_at=NOW() WHERE id=$1 RETURNING *',
            [id],
        );
        return result[0] || null;
    }
}
