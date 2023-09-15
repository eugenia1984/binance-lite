import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCard } from './entity/credit-card.entity';
import { CreditCardController } from './controller/credit-card.controller';
import { CreditCardService } from './service/credit-card.service';

@Module({
  imports: [TypeOrmModule.forFeature([CreditCard])],
  controllers: [CreditCardController],
  providers: [CreditCardService],
})
export class CreditCardsModule {}
