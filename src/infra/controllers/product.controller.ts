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
  import { ApiOperation, ApiTags } from '@nestjs/swagger';
  import {
    CreateProductDTO,
    FindProductsDTO,
    UpdateProductDTO,
  } from '../dtos/product.dto';
  import { ProductUseCase } from '../../core/modules/products/application/product.usecase';
  
  @ApiTags('Products')
  @Controller('products')
  export class ProductController {
    constructor(private readonly productUseCase: ProductUseCase) {}
  
    @ApiOperation({ summary: 'Get all products' })
    @Get()
    getAllproducts() {
      return this.productUseCase.findAll();
    }
  
    @ApiOperation({ summary: 'Get a product by ID' })
    @Get(':productId')
    @HttpCode(HttpStatus.ACCEPTED)
    getproduct(@Param('productId') productId: string) {
      return this.productUseCase.findOneById(productId);
    }
  
    @ApiOperation({ summary: 'Create a product' })
    @Post()
    create(@Body() payload: CreateProductDTO) {
      return this.productUseCase.create(payload);
    }
  
    @ApiOperation({ summary: 'Get products by ids' })
    @Post('getproducts')
    getproductsByIds(@Body() payload: FindProductsDTO) {
      return this.productUseCase.findByIds(payload.ids);
    }
  
    @ApiOperation({ summary: 'Modify a product' })
    @Put(':productId')
    update(
      @Param('productId') productId: string,
      @Body() payload: UpdateProductDTO,
    ) {
      return this.productUseCase.update(productId, payload);
    }
  
    @ApiOperation({ summary: 'Delete a product' })
    @Delete('/:productId')
    deleteproduct(@Param('productId') productId: string) {
      return this.productUseCase.delete(productId);
    }
  }
  