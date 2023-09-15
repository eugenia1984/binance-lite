import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CryptocurrencyEntity } from '../../entity/cryptocurrencies.entity';
import { CryptoHistoryEntity } from 'src/modules/crypto-histories/crypto-histories.entity';
import { createResponse } from '../../../../core/utils/response.util';

@Injectable()
export class CryptocurrenciesService {
  private readonly logger = new Logger(CryptocurrenciesService.name);

  constructor(
    @InjectRepository(CryptocurrencyEntity)
    private cryptocurrencyRepository: Repository<CryptocurrencyEntity>,
    @InjectRepository(CryptoHistoryEntity)
    private readonly cryptoHistoryRepository: Repository<CryptoHistoryEntity>,
  ) {}

  async findAll() {
    try {
      const data = await this.cryptocurrencyRepository.find();
      if (data) {
        return createResponse({
          data,
          message: 'Listado correcto',
        });
      }
      return createResponse({
        message: 'Error en el Listado',
      });
    } catch (error) {
      return createResponse({
        message: `Error en la Base datos ${error}`,
      });
    }
  }

  async findOne(id: string) {
    return this.cryptocurrencyRepository.findOne({ where: { uuid: id } });
  }

  /*
  @Cron(CronExpression.EVERY_MINUTE) // Esto se ejecutará cada minuto
  async handleCron() {
    try {
      await this.simulatePriceChange();
      this.logger.debug('Precios de las criptomonedas actualizados');
    } catch (error) {
      this.logger.error('Error actualizando precios:', error.message);
    }
  }

  private async simulatePriceChange(): Promise<void> {
    const cryptocurrencies = await this.cryptocurrencyRepository.find();

    for (const crypto of cryptocurrencies) {
      const change = Math.random() * 0.1 - 0.05; // Un valor aleatorio entre -0.05 (-5%) y 0.05 (+5%)

      const currentPriceNumber = parseFloat(crypto.currentPrice.toString());
      const newPrice = currentPriceNumber + currentPriceNumber * change;

      crypto.currentPrice = parseFloat(newPrice.toFixed(8));

      // Guardar el historial del precio en la tabla crypto_histories
      const cryptoHistory = new CryptoHistoryEntity();
      cryptoHistory.cryptoId = crypto.uuid;
      cryptoHistory.date = new Date(); // Guarda la fecha actual
      cryptoHistory.price = crypto.currentPrice; // Guarda el nuevo precio

      await this.cryptoHistoryRepository.save(cryptoHistory);

      await this.cryptocurrencyRepository.save(crypto);
    }
  }*/
}
