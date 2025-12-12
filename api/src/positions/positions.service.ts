import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from './entities/position.entity';

@Injectable()
export class PositionsService {
    constructor(private db: DatabaseService) {}

    async findAll(): Promise<Position[]> {
        const result = await this.db.query<Position>(
            'SELECT * FROM positions WHERE deleted_at IS NULL',
        );
        return result;
    }

    async findOne(id: number): Promise<Position | null> {
        const result = await this.db.query<Position>(
            'SELECT * FROM positions WHERE id=$1 AND deleted_at IS NULL',
            [id],
        );
        return result[0] || null;
    }

    async create(dto: CreatePositionDto): Promise<Position> {
        const result = await this.db.query<Position>(
            `INSERT INTO positions (name, created_at) VALUES ($1, NOW()) RETURNING *`,
            [dto.name],
        );
        return result[0];
    }

    async update(id: number, dto: UpdatePositionDto): Promise<Position | null> {
        const result = await this.db.query<Position>(
            `UPDATE positions SET name=$1, updated_at=NOW() WHERE id=$2 RETURNING *`,
            [dto.name, id],
        );
        return result[0] || null;
    }

    async remove(id: number): Promise<Position | null> {
        const result = await this.db.query<Position>(
            'UPDATE positions SET deleted_at=NOW() WHERE id=$1 RETURNING *',
            [id],
        );
        return result[0] || null;
    }
}
