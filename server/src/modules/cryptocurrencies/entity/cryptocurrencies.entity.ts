import { CryptoHistoryEntity } from 'src/modules/crypto-histories/crypto-histories.entity';
import { TransactionEntity } from 'src/modules/transactions/entity/transactions.entity';
import { UserFavoritesEntity } from 'src/modules/user-favorites/entity/user-favorites.entity';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'cryptocurrencies' })
export class CryptocurrencyEntity {
  @PrimaryColumn({ length: 255 })
  uuid: string;

  @Column({ length: 10 })
  symbol: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 10 })
  color: string;

  @Column({ type: 'varchar', nullable: true, name: 'icon_url' })
  iconUrl: string;

  @Column({ type: 'decimal', precision: 20, scale: 8, name: 'current_price' })
  currentPrice: number;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  change: number;

  @Column({ type: 'decimal', precision: 20, scale: 2, name: 'market_cap' })
  marketCap: number;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.crypto)
  transactions: TransactionEntity[];

  @OneToMany(() => CryptoHistoryEntity, (history) => history.crypto)
  histories: CryptoHistoryEntity[];

  @OneToMany(
    () => UserFavoritesEntity,
    (userFavorite) => userFavorite.cryptocurrency,
  )
  userFavorites: UserFavoritesEntity[];
}
