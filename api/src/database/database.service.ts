import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
    private pool: Pool;

    constructor(private configService: ConfigService) {
        this.pool = new Pool({
            host: this.configService.get<string>('DB_HOST', 'localhost'),
            port: this.configService.get<number>('DB_PORT', 5433),
            user: this.configService.get<string>('DB_USER', 'postgres'),
            password: this.configService.get<string>('DB_PASSWORD', 'postgres'),
            database: this.configService.get<string>('DB_NAME', 'areal_hr'),
        });
    }

    async onModuleDestroy() {
        await this.pool.end();
        console.log('PostgreSQL disconnected');
    }

    async query<T>(sql: string, params?: any[]): Promise<T[]> {
        const result = await this.pool.query(sql, params);
        return result.rows;
    }

    async execute(sql: string, params?: any[]): Promise<void> {
        await this.pool.query(sql, params);
    }
}
