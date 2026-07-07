// database.service.ts
import { neon } from '@neondatabase/serverless';
import { Injectable , OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleInit {
    private readonly sql;

    constructor(private configService: ConfigService) {
        const databaseUrl = this.configService.get('DATABASE_URL');
        this.sql = neon(databaseUrl);
    }

    async onModuleInit() {
        try {
          await this.sql`SELECT 1`;
          console.log('Database connected');
        } catch (error) {
          console.error('Database connection failed', error);
        }
    }
}