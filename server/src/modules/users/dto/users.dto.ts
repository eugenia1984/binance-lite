import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsNumber,
} from 'class-validator';

// DTO para la creación de un usuario
export class CreateUserDTO {
  @IsString()
  @MinLength(4)
  @IsOptional()
  @ApiProperty({
    description: 'Nombre de usuario',
  })
  username?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    description: 'correo electronico',
  })
  email?: string;

  @IsString()
  @MinLength(6) // Requiere una contraseña de al menos 6 caracteres
  @ApiProperty({
    description: 'contraseña',
  })
  password: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'valor con el que inicia en la aplicacion',
  })
  balance?: number = 1000;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'numero de celular',
  })
  celphone?: string;
}

// DTO para actualizar un usuario
export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
