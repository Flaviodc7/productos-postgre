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
import {
  CreateCategoryDTO,
  FindCategoriesDTO,
  UpdateCategoryDTO,
} from '@dtos/categories.dto';
import { CategoryUseCase } from '@categoriesApplication/categories.usecase';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryUseCase: CategoryUseCase) {}

  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  getAllCategories() {
    return this.categoryUseCase.findAll();
  }

  @ApiOperation({ summary: 'Get a category by ID' })
  @Get(':categoryId')
  @HttpCode(HttpStatus.ACCEPTED)
  getCategoryById(@Param('categoryId') categoryId: string) {
    return this.categoryUseCase.findOneById(categoryId);
  }

  @ApiOperation({ summary: 'Create a category' })
  @Post()
  createCategory(@Body() payload: CreateCategoryDTO) {
    return this.categoryUseCase.create(payload);
  }

  @ApiOperation({ summary: 'Get categories by ids' })
  @Post('getcategoriesbyids')
  getcategoriesByIds(@Body() payload: FindCategoriesDTO) {
    return this.categoryUseCase.findByIds(payload.ids);
  }

  @ApiOperation({ summary: 'Modify a category' })
  @Put()
  updateCategory(@Body() payload: UpdateCategoryDTO) {
    return this.categoryUseCase.update(payload);
  }

  @ApiOperation({ summary: 'Delete a category' })
  @Delete('/:categoryId')
  deleteCategory(@Param('categoryId') categoryId: string) {
    return this.categoryUseCase.delete(categoryId);
  }
}
