import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '.././config/config';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configEnv: ConfigType<typeof config>) => {
        return {
          type: 'postgres',
          url: configEnv.postgresUrl,
          ssl: {
            rejectUnauthorized: false,
          },
          synchronize: false, //modificar para el autosincronize
          //synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'PG',
      useFactory: (configEnv: ConfigType<typeof config>) => {
        const client = new Client({
          connectionString: configEnv.postgresUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['PG'],
})
export class DatabaseModule {}
