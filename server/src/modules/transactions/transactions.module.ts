import { Module } from '@nestjs/common';
import { TransactionEntity } from './entity/transactions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
})
export class TransactionsModule {}
