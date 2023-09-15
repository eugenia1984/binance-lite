import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CryptocurrencyEntity } from '../cryptocurrencies/entity/cryptocurrencies.entity';

@Entity({ name: 'crypto_histories' })
export class CryptoHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'crypto_id', length: 255 })
  cryptoId: string;

  @ManyToOne(() => CryptocurrencyEntity, (crypto) => crypto.histories)
  @JoinColumn({ name: 'crypto_id' })
  crypto: CryptocurrencyEntity;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'decimal', precision: 20, scale: 8 })
  price: number;
}
