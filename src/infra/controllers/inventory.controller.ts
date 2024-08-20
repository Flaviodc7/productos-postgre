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
  CreateInventoryDTO,
  FindInventoriesDTO,
  UpdateInventoryDTO,
} from '@dtos/inventory.dto';
import { InventoryUseCase } from '@inventoryApplication/inventory.usecase';

@ApiTags('Inventories')
@Controller('inventories')
export class InventoryController {
  constructor(private readonly inventoryUseCase: InventoryUseCase) {}

  @ApiOperation({ summary: 'Get all inventories' })
  @Get()
  getAllInventorys() {
    return this.inventoryUseCase.findAll();
  }

  @ApiOperation({ summary: 'Get an inventory by ID' })
  @Get(':inventoryId')
  @HttpCode(HttpStatus.ACCEPTED)
  getInventoryById(@Param('inventoryId') inventoryId: string) {
    return this.inventoryUseCase.findOneById(inventoryId);
  }

  @ApiOperation({ summary: 'Create an inventory' })
  @Post()
  createInventory(@Body() payload: CreateInventoryDTO) {
    return this.inventoryUseCase.create(payload);
  }

  @ApiOperation({ summary: 'Get inventories by ids' })
  @Post('getinventorysbyids')
  getinventorysByIds(@Body() payload: FindInventoriesDTO) {
    return this.inventoryUseCase.findByIds(payload.ids);
  }

  @ApiOperation({ summary: 'Modify an inventory' })
  @Put()
  updateInventory(@Body() payload: UpdateInventoryDTO) {
    return this.inventoryUseCase.update(payload);
  }

  @ApiOperation({ summary: 'Delete an inventory' })
  @Delete('/:inventoryId')
  deleteInventory(@Param('inventoryId') inventoryId: string) {
    return this.inventoryUseCase.delete(inventoryId);
  }
}
