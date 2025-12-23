import { Module } from '@nestjs/common';
import { HrOperationsService } from './hr_operations.service';
import { HrOperationsController } from './hr_operations.controller';
import {DatabaseModule} from "../database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [HrOperationsController],
    providers: [HrOperationsService],
    exports: [HrOperationsService]
})
export class HrOperationsModule {}
