import { Test, TestingModule } from '@nestjs/testing';
import { CryptocurrenciesController } from './cryptocurrencies.controller';

describe('CryptocurrenciesController', () => {
  let controller: CryptocurrenciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptocurrenciesController],
    }).compile();

    controller = module.get<CryptocurrenciesController>(CryptocurrenciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
