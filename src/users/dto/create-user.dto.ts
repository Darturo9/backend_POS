import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { Role } from '../role.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  username: string;

  @IsEmail({}, { message: 'Correo no válido' })
  email: string;

  @IsOptional()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password?: string;

  @IsEnum(Role, { message: 'Rol no válido' })
  role: Role;
}
