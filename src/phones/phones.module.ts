import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhonesService } from './phones.service';
import { PhonesController } from './phones.controller';
import { Phone } from './entities/phone.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phone, User])],
  controllers: [PhonesController],
  providers: [PhonesService],
})
export class PhonesModule {}
