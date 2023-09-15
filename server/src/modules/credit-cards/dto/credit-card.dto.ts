// dto/credit-card.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsInt,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateCreditCardDto {
  @ApiProperty({ description: 'Número de tarjeta de crédito (16 dígitos)' })
  @IsString()
  @IsNotEmpty()
  @Length(16, 16)
  cardNumber: string;

  @ApiProperty({ description: 'Fecha de vencimiento de la tarjeta' })
  @IsString()
  @IsNotEmpty()
  expirationDate: string;

  @ApiProperty({ description: 'CVV de la tarjeta de crédito' })
  @IsString()
  @IsNotEmpty()
  cvv: string;

  @ApiProperty({ description: 'ID del usuario al que pertenece la tarjeta' })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  userID: number;
}

export class UpdateCreditCardDto {
  @ApiProperty({ description: 'Número de tarjeta de crédito (16 dígitos)' })
  @IsOptional()
  @IsString()
  @Length(16, 16)
  cardNumber: string;

  @ApiProperty({ description: 'Fecha de vencimiento de la tarjeta' })
  @IsOptional()
  @IsString()
  expirationDate: string;

  @ApiProperty({ description: 'CVV de la tarjeta de crédito' })
  @IsOptional()
  @IsString()
  cvv: string;

  @ApiProperty({ description: 'ID del usuario al que pertenece la tarjeta' })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  userID: number;
}
