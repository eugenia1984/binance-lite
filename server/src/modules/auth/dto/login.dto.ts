import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @ApiProperty({
    description: 'Nombre de usuario o correo electrónico',
  })
  userOrEmail: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: 'contraseña',
  })
  password: string;
}
