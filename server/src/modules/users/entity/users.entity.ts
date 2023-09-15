import { TransactionEntity } from 'src/modules/transactions/entity/transactions.entity';
import { UserFavoritesEntity } from 'src/modules/user-favorites/entity/user-favorites.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  username: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ name: 'password_hash', length: 255 })
  passwordHash: string;

  @Column({ type: 'decimal', precision: 20, scale: 2 })
  balance: number;

  @Column({ length: 255, unique: true, name: 'cellphone' })
  celphone: string;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user)
  transactions: TransactionEntity[];

  @OneToMany(() => UserFavoritesEntity, (userFavorite) => userFavorite.user)
  userFavorites: UserFavoritesEntity[];
}
