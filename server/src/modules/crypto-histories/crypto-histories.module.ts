import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoHistoryEntity } from './crypto-histories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CryptoHistoryEntity])],
  exports: [TypeOrmModule],
})
export class CryptoHistoriesModule {}
