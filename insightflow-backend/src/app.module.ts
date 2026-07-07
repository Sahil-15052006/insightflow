import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database/database.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}), UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    DatabaseService
  ],
})

export class AppModule {}
