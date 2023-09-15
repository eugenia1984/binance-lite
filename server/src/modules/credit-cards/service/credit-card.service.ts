import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditCard } from '../entity/credit-card.entity';
import {
  CreateCreditCardDto,
  UpdateCreditCardDto,
} from '../dto/credit-card.dto'; // Importa el DTO

@Injectable()
export class CreditCardService {
  constructor(
    @InjectRepository(CreditCard)
    private readonly creditCardRepository: Repository<CreditCard>,
  ) {}

  findAll(): Promise<CreditCard[]> {
    return this.creditCardRepository.find();
  }

  findByUserID(userID: number): Promise<CreditCard[]> {
    return this.creditCardRepository.find({ where: { userID } });
  }

  create(createCreditCardDto: CreateCreditCardDto): Promise<CreditCard> {
    const creditCard = new CreditCard();
    creditCard.cardNumber = createCreditCardDto.cardNumber;
    creditCard.expirationDate = createCreditCardDto.expirationDate;
    creditCard.cvv = createCreditCardDto.cvv;
    creditCard.userID = createCreditCardDto.userID;

    return this.creditCardRepository.save(creditCard);
  }

  async update(
    id: number,
    updateCreditCardDto: UpdateCreditCardDto,
  ): Promise<CreditCard> {
    const creditCard = new CreditCard();
    creditCard.cardNumber = updateCreditCardDto.cardNumber;
    creditCard.expirationDate = updateCreditCardDto.expirationDate;
    creditCard.cvv = updateCreditCardDto.cvv;
    creditCard.userID = updateCreditCardDto.userID;

    await this.creditCardRepository.update(id, creditCard);
    return this.creditCardRepository.findOne(id as any);
  }

  async remove(id: number): Promise<void> {
    await this.creditCardRepository.delete(id);
  }
}
