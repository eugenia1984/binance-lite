import { CryptocurrencyEntity } from 'src/modules/cryptocurrencies/entity/cryptocurrencies.entity';
import { UserEntity } from 'src/modules/users/entity/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('user_favorites')
export class UserFavoritesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'user_id',
    nullable: false,
  })
  userId: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'crypto_id',
    nullable: false,
  })
  cryptoId: string;

  @ManyToOne(() => UserEntity, (user) => user.userFavorites)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: UserEntity;

  @ManyToOne(
    () => CryptocurrencyEntity,
    (cryptocurrency) => cryptocurrency.userFavorites,
  )
  @JoinColumn([{ name: 'crypto_id', referencedColumnName: 'uuid' }])
  cryptocurrency: CryptocurrencyEntity;
}
