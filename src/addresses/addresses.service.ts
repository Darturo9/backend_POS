import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address) private readonly addressRepository: Repository<Address>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    const user = await this.userRepository.findOneBy({ id: createAddressDto.userId });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const address = this.addressRepository.create({ ...createAddressDto, user });
    return this.addressRepository.save(address);
  }

  findAll() {
    return this.addressRepository.find();
  }

  async findOne(id: number) {
    const address = await this.addressRepository.findOneBy({ id });
    if (!address) {
      throw new NotFoundException('Dirección no encontrada');
    }
    return address;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const address = await this.findOne(id);
    Object.assign(address, updateAddressDto);
    return this.addressRepository.save(address);
  }

  async remove(id: number) {
    const address = await this.findOne(id);
    await this.addressRepository.remove(address);
    return 'Dirección eliminada exitosamente';
  }
}
