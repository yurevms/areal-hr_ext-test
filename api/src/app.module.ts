    import { Module } from '@nestjs/common';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    import { DatabaseModule } from './database/database.module';
    import {ConfigModule} from "@nestjs/config";
    import { OrganizationsModule } from './organizations/organizations.module';
import { DepartmentsModule } from './departments/departments.module';
import { PositionsModule } from './positions/positions.module';
import { EmployeesModule } from './employees/employees.module';

    @Module({
      imports: [
          ConfigModule.forRoot({ isGlobal: true }),
          DatabaseModule,
          OrganizationsModule,
          DepartmentsModule,
          PositionsModule,
          EmployeesModule
      ],
      controllers: [
          AppController
      ],
      providers: [
          AppService
      ],
    })
    export class AppModule {}
