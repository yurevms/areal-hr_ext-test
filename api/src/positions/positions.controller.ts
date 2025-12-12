import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from './entities/position.entity';

@Controller('positions')
export class PositionsController {
    constructor(private readonly positionsService: PositionsService) {}

    @Get()
    findAll(): Promise<Position[]> {
        return this.positionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Position | null> {
        return this.positionsService.findOne(+id);
    }

    @Post()
    create(@Body() createPositionDto: CreatePositionDto): Promise<Position> {
        return this.positionsService.create(createPositionDto);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePositionDto: UpdatePositionDto,
    ): Promise<Position | null> {
        return this.positionsService.update(+id, updatePositionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Position | null> {
        return this.positionsService.remove(+id);
    }
}
