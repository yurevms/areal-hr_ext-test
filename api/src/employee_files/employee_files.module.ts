import { Module } from '@nestjs/common';
import { EmployeeFilesService } from './employee_files.service';
import { EmployeeFilesController } from './employee_files.controller';
import {DatabaseModule} from "../database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [EmployeeFilesController],
    providers: [EmployeeFilesService],
    exports: [EmployeeFilesService]

})
export class EmployeeFilesModule {}
