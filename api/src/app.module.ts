    import { Module } from '@nestjs/common';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    import { DatabaseModule } from './database/database.module';
    import {ConfigModule} from "@nestjs/config";
    import { OrganizationsModule } from './organizations/organizations.module';
import { DepartmentsModule } from './departments/departments.module';
import { PositionsModule } from './positions/positions.module';
import { EmployeesModule } from './employees/employees.module';
import { FilesModule } from './files/files.module';
import { EmployeeFilesModule } from './employee_files/employee_files.module';
import { HrOperationsModule } from './hr_operations/hr_operations.module';
import { HistoryModule } from './history/history.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

    @Module({
      imports: [
          ConfigModule.forRoot({ isGlobal: true }),
          DatabaseModule,
          OrganizationsModule,
          DepartmentsModule,
          PositionsModule,
          EmployeesModule,
          FilesModule,
          EmployeeFilesModule,
          HrOperationsModule,
          HistoryModule,
          UsersModule,
          AuthModule
      ],
      controllers: [
          AppController
      ],
      providers: [
          AppService,
          AuthService
      ],
    })
    export class AppModule {}
