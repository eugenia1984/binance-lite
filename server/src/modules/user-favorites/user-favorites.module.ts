import { Module } from '@nestjs/common';
import { UserFavoritesController } from './controller/user-favorites.controller';
import { UserFavoritesService } from './service/user-favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFavoritesEntity } from './entity/user-favorites.entity';
import { CryptocurrenciesModule } from '../cryptocurrencies/cryptocurrencies.module';
import { UserModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserFavoritesEntity]),
    CryptocurrenciesModule,
    UserModule,
  ],
  controllers: [UserFavoritesController],
  providers: [UserFavoritesService],
})
export class UserFavoritesModule {}
