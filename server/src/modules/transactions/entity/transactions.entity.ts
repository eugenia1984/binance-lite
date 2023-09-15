import { CryptocurrencyEntity } from 'src/modules/cryptocurrencies/entity/cryptocurrencies.entity';
import { UserEntity } from 'src/modules/users/entity/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'transactions' })
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'crypto_id', length: 255 })
  cryptoId: string;

  @ManyToOne(() => CryptocurrencyEntity, (crypto) => crypto.transactions)
  @JoinColumn({ name: 'crypto_id' })
  crypto: CryptocurrencyEntity;

  @Column({ type: 'decimal', precision: 20, scale: 8 })
  amount: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 8,
    name: 'price_at_time_of_purchase',
  })
  priceAtTimeOfPurchase: number;

  @Column({ name: 'transaction_date', type: 'timestamp' })
  transactionDate: Date;

  @Column({ length: 255 })
  type: string;
}
