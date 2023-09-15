import { Test, TestingModule } from '@nestjs/testing';
import { CryptocurrenciesService } from './cryptocurrencies.service';

describe('CryptocurrenciesService', () => {
  let service: CryptocurrenciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptocurrenciesService],
    }).compile();

    service = module.get<CryptocurrenciesService>(CryptocurrenciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
