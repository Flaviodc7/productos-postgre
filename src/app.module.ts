import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SubcategoryModule } from '@modules/subcategories.module';
import { CategoryModule } from '@modules/categories.module';
import { ProductModule } from '@modules/products.module';
import { DatabaseModule } from '@db/database.module';
import { AppController } from '@src/app.controller';
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
    ProductModule,
    CategoryModule,
    SubcategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
