import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductDto {

    @IsNotEmpty({ message: "El nombre del producto no puede estar vacio" })
    @IsString({ message: "El valor no es valido" })
    name: string

    @IsNotEmpty({ message: "El precio del producto no puede estar vacio" })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: "El precio ingresado no es valido" })
    price: number

    @IsNotEmpty({ message: "La cantidad no puede estar vacia" })
    @IsNumber({ maxDecimalPlaces: 0 }, { message: "Cantidad no validad" })
    inventory: number

    @IsNotEmpty({ message: "La categoria es obligatoria" })
    @IsInt({ message: "La categoria no es valida" })
    categoryId: number


}
