import { Module } from '@nestjs/common';
import { CryptocurrenciesService } from './services/cryptocurrencies/cryptocurrencies.service';
import { CryptocurrenciesController } from './controller/cryptocurrencies/cryptocurrencies.controller';
import { CryptocurrencyEntity } from './entity/cryptocurrencies.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoHistoriesModule } from '../crypto-histories/crypto-histories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CryptocurrencyEntity]),
    CryptoHistoriesModule,
  ],
  providers: [CryptocurrenciesService],
  controllers: [CryptocurrenciesController],
  exports: [CryptocurrenciesService, TypeOrmModule],
})
export class CryptocurrenciesModule {}
