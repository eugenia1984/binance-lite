import { Controller, Get, Param } from '@nestjs/common';
import { CryptocurrenciesService } from '../../services/cryptocurrencies/cryptocurrencies.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Cryptocurrencies')
@Controller('api/v1/cryptocurrencies')
export class CryptocurrenciesController {
  constructor(
    private readonly cryptocurrenciesService: CryptocurrenciesService,
  ) {}

  @Get()
  @ApiOperation({
    summary:
      'Recuperar una lista de todas las criptomonedas que se actualiza por minuto',
  })
  findAll() {
    return this.cryptocurrenciesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Recuperar detalles de una criptomoneda específica mediante su ID',
  })
  findOne(@Param('id') id: string) {
    return this.cryptocurrenciesService.findOne(id);
  }
}
