import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeFileDto } from './create-employee_file.dto';

export class UpdateEmployeeFileDto extends PartialType(CreateEmployeeFileDto) {}
