import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateUserFavoritesDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  userId: number;

  @IsNotEmpty()
  @IsString({ each: true })
  @ApiProperty({ example: ['uuid1', 'uuid2'] })
  cryptoId: string[];
}
export class UpdateUserFavoritesDto extends PartialType(
  CreateUserFavoritesDto,
) {}
