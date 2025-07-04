import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from './role.enum';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    // Hashear la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    // Asignar rol por defecto si no viene
    const user = this.userRepository.create({
      ...createUserDto,
      role: createUserDto.role || Role.CLIENT,
      password: hashedPassword,
    });
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof QueryFailedError && (error as any).code === '23505') {
        // 23505 = unique_violation en Postgres
        const detail = (error as any).detail as string;
        if (detail.includes('email')) {
          throw new Error('El correo ya está registrado');
        }
        if (detail.includes('username')) {
          throw new Error('El nombre de usuario ya está registrado');
        }
        throw new Error('Usuario duplicado');
      }
      throw error;
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return 'Usuario eliminado exitosamente';
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
