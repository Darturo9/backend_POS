import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { Phone } from './entities/phone.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PhonesService {
  constructor(
    @InjectRepository(Phone) private readonly phoneRepository: Repository<Phone>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createPhoneDto: CreatePhoneDto) {
    const user = await this.userRepository.findOneBy({ id: createPhoneDto.userId });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const phone = this.phoneRepository.create({ ...createPhoneDto, user });
    return this.phoneRepository.save(phone);
  }

  findAll() {
    return this.phoneRepository.find();
  }

  async findOne(id: number) {
    const phone = await this.phoneRepository.findOneBy({ id });
    if (!phone) {
      throw new NotFoundException('Teléfono no encontrado');
    }
    return phone;
  }

  async update(id: number, updatePhoneDto: UpdatePhoneDto) {
    const phone = await this.findOne(id);
    Object.assign(phone, updatePhoneDto);
    return this.phoneRepository.save(phone);
  }

  async remove(id: number) {
    const phone = await this.findOne(id);
    await this.phoneRepository.remove(phone);
    return 'Teléfono eliminado exitosamente';
  }
}
