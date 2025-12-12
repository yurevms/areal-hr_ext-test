    import { Module } from '@nestjs/common';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    import { DatabaseModule } from './database/database.module';
    import {ConfigModule} from "@nestjs/config";
    import { OrganizationsModule } from './organizations/organizations.module';

    @Module({
      imports: [
          ConfigModule.forRoot({ isGlobal: true }),
          DatabaseModule,
          OrganizationsModule
      ],
      controllers: [
          AppController
      ],
      providers: [
          AppService
      ],
    })
    export class AppModule {}
