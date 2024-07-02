import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ProductModule } from './infra/modules/product.module';
import { DatabaseModule } from './infra/db/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
