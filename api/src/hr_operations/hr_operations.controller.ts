import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HrOperationsService } from './hr_operations.service';
import { CreateHrOperationDto } from './dto/create-hr_operation.dto';
import { UpdateHrOperationDto } from './dto/update-hr_operation.dto';
import {HrOperation} from "./entities/hr_operation.entity";

@Controller('hr-operations')
export class HrOperationsController {
  constructor(private readonly hrOperationsService: HrOperationsService) {}

  @Post()
  create(@Body() createHrOperationDto: CreateHrOperationDto): Promise<HrOperation> {
    return this.hrOperationsService.create(createHrOperationDto);
  }

  @Get()
  findAll(): Promise<HrOperation[]> {
    return this.hrOperationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<HrOperation | null> {
    return this.hrOperationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHrOperationDto: UpdateHrOperationDto): Promise<HrOperation | null> {
    return this.hrOperationsService.update(+id, updateHrOperationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<HrOperation | null> {
    return this.hrOperationsService.remove(+id);
  }
}
