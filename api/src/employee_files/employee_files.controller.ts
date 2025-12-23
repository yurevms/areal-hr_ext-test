import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeFilesService } from './employee_files.service';
import { CreateEmployeeFileDto } from './dto/create-employee_file.dto';
import { UpdateEmployeeFileDto } from './dto/update-employee_file.dto';
import {EmployeeFile} from "./entities/employee_file.entity";

@Controller('employee-files')
export class EmployeeFilesController {
  constructor(private readonly employeeFilesService: EmployeeFilesService) {}

  @Post()
  create(@Body() createEmployeeFileDto: CreateEmployeeFileDto):Promise<EmployeeFile> {
    return this.employeeFilesService.create(createEmployeeFileDto);
  }

  @Get()
  findAll(): Promise<EmployeeFile[]> {
    return this.employeeFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<EmployeeFile | null> {
    return this.employeeFilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeFileDto: UpdateEmployeeFileDto): Promise<EmployeeFile | null> {
    return this.employeeFilesService.update(+id, updateEmployeeFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<EmployeeFile | null> {
    return this.employeeFilesService.remove(+id);
  }
}
