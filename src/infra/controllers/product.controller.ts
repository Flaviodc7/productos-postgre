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
import { ProductUseCase } from '@productApplication/product.usecase';
import {
  CreateProductDTO,
  FindProductsDTO,
  UpdateProductDTO,
} from '@dtos/product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productUseCase: ProductUseCase) {}

  @ApiOperation({ summary: 'Get all products' })
  @Get()
  getAllProducts() {
    return this.productUseCase.findAll();
  }

  @ApiOperation({ summary: 'Get a product by ID' })
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProductById(@Param('productId') productId: string) {
    return this.productUseCase.findOneById(productId);
  }

  @ApiOperation({ summary: 'Create a product' })
  @Post()
  createProduct(@Body() payload: CreateProductDTO) {
    return this.productUseCase.create(payload);
  }

  @ApiOperation({ summary: 'Get products by ids' })
  @Post('getproducts')
  getProductsByIds(@Body() payload: FindProductsDTO) {
    return this.productUseCase.findByIds(payload.ids);
  }

  @ApiOperation({ summary: 'Modify a product' })
  @Put(':productId')
  updateProduct(
    @Body() payload: UpdateProductDTO,
  ) {
    return this.productUseCase.update(payload);
  }

  @ApiOperation({ summary: 'Delete a product' })
  @Delete('/:productId')
  deleteProduct(@Param('productId') productId: string) {
    return this.productUseCase.delete(productId);
  }
}
