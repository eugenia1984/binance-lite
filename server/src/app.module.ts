import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/users.module';
import { CryptocurrenciesModule } from './modules/cryptocurrencies/cryptocurrencies.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { CryptoHistoriesModule } from './modules/crypto-histories/crypto-histories.module';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './core/config/enviroments';
import config from './core/config/config';
import * as Joi from 'joi';
import { ScheduleModule } from '@nestjs/schedule';
import { UserFavoritesModule } from './modules/user-favorites/user-favorites.module';
import { CreditCardsModule } from './modules/credit-cards/credit-card.modules';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        //DATABASE_URL: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    AuthModule,
    UserModule,
    CryptocurrenciesModule,
    TransactionsModule,
    CryptoHistoriesModule,
    DatabaseModule,
    UserFavoritesModule,
    CreditCardsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
