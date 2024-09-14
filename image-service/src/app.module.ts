import { Module } from '@nestjs/common';
import { KafkaService } from './app.service';
import { CloudinaryService } from './cloudinary.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [KafkaService, CloudinaryService]
})
export class AppModule {}