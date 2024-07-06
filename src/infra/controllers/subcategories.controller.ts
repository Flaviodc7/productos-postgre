import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SubcategoryUseCase } from '@subcategoriesApplication/subcategories.usecase';
import {
  CreateSubcategoryDTO,
  FindSubcategoriesDTO,
  UpdateSubcategoryDTO,
} from '@dtos/subcategories.dto';

@ApiTags('Subcategories')
@Controller('subcategories')
export class SubcategoryController {
  constructor(private readonly subcategoryUseCase: SubcategoryUseCase) {}

  @ApiOperation({ summary: 'Get all subcategories' })
  @Get()
  getAllSubcategories() {
    return this.subcategoryUseCase.findAll();
  }

  @ApiOperation({ summary: 'Get a subcategory by ID' })
  @Get(':subcategoryId')
  @HttpCode(HttpStatus.ACCEPTED)
  getSubcategoryById(@Param('subcategoryId') subcategoryId: string) {
    return this.subcategoryUseCase.findOneById(subcategoryId);
  }

  @ApiOperation({ summary: 'Create a subcategory' })
  @Post()
  createSubcategory(@Body() payload: CreateSubcategoryDTO) {
    return this.subcategoryUseCase.create(payload);
  }

  @ApiOperation({ summary: 'Get subcategories by ids' })
  @Post('getsubcategorys')
  getSubcategorysByIds(@Body() payload: FindSubcategoriesDTO) {
    return this.subcategoryUseCase.findByIds(payload.ids);
  }

  @ApiOperation({ summary: 'Modify a subcategory' })
  @Put(':subcategoryId')
  updateSubcategory(
    @Body() payload: UpdateSubcategoryDTO,
  ) {
    return this.subcategoryUseCase.update(payload);
  }

  @ApiOperation({ summary: 'Delete a subcategory' })
  @Delete('/:subcategoryId')
  deleteSubcategory(@Param('subcategoryId') subcategoryId: string) {
    return this.subcategoryUseCase.delete(subcategoryId);
  }
}
