import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhoneDto {
  @IsString()
  @IsNotEmpty()
  number: string;

  userId: number;
}
