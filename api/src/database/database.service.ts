import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            host: process.env.DB_HOST ?? 'localhost',
            port: parseInt(process.env.DB_PORT ?? '5432', 10),
            user: process.env.DB_USER ?? 'postgres',
            password: process.env.DB_PASSWORD ?? 'postgres',
            database: process.env.DB_NAME ?? 'areal_hr',
        });
    }

    async onModuleInit() {
        console.log('Connecting to PostgreSQL...');
        await this.pool.connect();
        console.log('PostgreSQL connected');
    }

    async onModuleDestroy() {
        await this.pool.end();
        console.log('PostgreSQL disconnected');
    }

    // Метод для выполнения SQL-запросов
    async query<T>(sql: string, params?: any[]): Promise<T[]> {
        const result = await this.pool.query(sql, params);
        return result.rows;
    }

    // Метод для выполнения запросов без возврата результата (INSERT, UPDATE, DELETE)
    async execute(sql: string, params?: any[]): Promise<void> {
        await this.pool.query(sql, params);
    }
}
