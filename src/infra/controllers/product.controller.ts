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
  FindProductsSkusDTO,
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

  @ApiOperation({ summary: 'Get a product by SKU' })
  @Get(':productSku')
  @HttpCode(HttpStatus.ACCEPTED)
  getProductById(@Param('productSku') productSku: string) {
    return this.productUseCase.findOneBySku(productSku);
  }

  @ApiOperation({ summary: 'Create a product' })
  @Post()
  createProduct(@Body() payload: CreateProductDTO) {
    return this.productUseCase.create(payload);
  }

  @ApiOperation({ summary: 'Get products by SKUs' })
  @Post('getproducts')
  getProductsByIds(@Body() payload: FindProductsSkusDTO) {
    return this.productUseCase.findBySkus(payload.skus);
  }

  @ApiOperation({ summary: 'Modify a product' })
  @Put()
  updateProduct(@Body() payload: UpdateProductDTO) {
    return this.productUseCase.update(payload);
  }

  @ApiOperation({ summary: 'Delete a product' })
  @Delete('/:productSku')
  deleteProduct(@Param('productSku') productSku: string) {
    return this.productUseCase.delete(productSku);
  }
}
