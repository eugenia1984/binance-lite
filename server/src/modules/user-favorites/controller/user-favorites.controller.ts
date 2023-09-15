import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserFavoritesService } from '../service/user-favorites.service';
import { CreateUserFavoritesDto } from '../dto/user-favorites.dto';

@ApiTags('User-Favorites')
@Controller('api/v1/user-favorites')
export class UserFavoritesController {
  constructor(private readonly service: UserFavoritesService) {}

  @Post()
  create(@Body() dto: CreateUserFavoritesDto) {
    return this.service.create(dto);
  }

  @Get('list-favorites/:userId')
  async listFavorites(@Param('userId') userId: number) {
    return await this.service.listUserFavorites(userId);
  }

  @Delete('delete/:userId/:cryptoId')
  async deleteFavorite(
    @Param('userId') userId: number,
    @Param('cryptoId') cryptoId: string,
  ) {
    return await this.service.deleteUserFavorite(userId, cryptoId);
  }
}
