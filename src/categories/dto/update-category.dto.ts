import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsString()
    @IsNotEmpty({message: "El nombre de la categoria no puede estar vacio"})
    name: string;
}
