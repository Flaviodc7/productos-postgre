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

@ApiTags('Categories')
@Controller('categories')
export class SubcategoryController {
  constructor(private readonly subcategoryUseCase: SubcategoryUseCase) {}

  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  getAllsubcategorys() {
    return this.subcategoryUseCase.findAll();
  }

  @ApiOperation({ summary: 'Get a subcategory by ID' })
  @Get(':subcategoryId')
  @HttpCode(HttpStatus.ACCEPTED)
  getsubcategory(@Param('subcategoryId') subcategoryId: string) {
    return this.subcategoryUseCase.findOneById(subcategoryId);
  }

  @ApiOperation({ summary: 'Create a subcategory' })
  @Post()
  create(@Body() payload: CreateSubcategoryDTO) {
    return this.subcategoryUseCase.create(payload);
  }

  @ApiOperation({ summary: 'Get categories by ids' })
  @Post('getsubcategorys')
  getsubcategorysByIds(@Body() payload: FindSubcategoriesDTO) {
    return this.subcategoryUseCase.findByIds(payload.ids);
  }

  @ApiOperation({ summary: 'Modify a subcategory' })
  @Put(':subcategoryId')
  update(
    @Param('subcategoryId') subcategoryId: string,
    @Body() payload: UpdateSubcategoryDTO,
  ) {
    return this.subcategoryUseCase.update(subcategoryId, payload);
  }

  @ApiOperation({ summary: 'Delete a subcategory' })
  @Delete('/:subcategoryId')
  deletesubcategory(@Param('subcategoryId') subcategoryId: string) {
    return this.subcategoryUseCase.delete(subcategoryId);
  }
}
