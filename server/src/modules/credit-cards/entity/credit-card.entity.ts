import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'credit_cards' })
export class CreditCard {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '1234567890123456' })
  @Column({ name: 'card_number', length: 12, unique: true })
  cardNumber: string;

  @ApiProperty({ example: '05/23' })
  @Column({ name: 'expiration_date', unique: false })
  expirationDate: string;

  @ApiProperty({ example: '123' })
  @Column({ name: 'cvv', unique: false })
  cvv: string;

  @ApiProperty({ example: '2' })
  @Column({ name: 'user_id', unique: false })
  userID: number;
}
