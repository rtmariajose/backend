import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import {DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER} from "./config/constants";



@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal:true
  }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get(<string>DB_HOST),
        port: +configService.get(<string>DB_PORT),
        username: configService.get(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get(<string>DB_DATABASE),
        entities: [],
        synchronize: true,
      }),
      inject: [ConfigService],
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
