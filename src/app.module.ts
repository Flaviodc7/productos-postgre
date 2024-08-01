import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { OrderDetailsModule } from '@modules/orderDetails.module';
import { SubcategoryModule } from '@modules/subcategories.module';
import { InventoryModule } from '@modules/inventory.module';
import { CategoryModule } from '@modules/categories.module';
import { ProductModule } from '@modules/products.module';
import { DatabaseModule } from '@db/database.module';
import { OrderModule } from '@modules/order.module';
import { AppController } from '@src/app.controller';
import { FilesModule } from '@modules/files.module';
import { AppService } from '@src/app.service';
import config from '@src/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
    CategoryModule,
    FilesModule,
    InventoryModule,
    OrderModule,
    OrderDetailsModule,
    ProductModule,
    SubcategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
