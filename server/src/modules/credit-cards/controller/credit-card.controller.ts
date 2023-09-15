import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreditCardService } from '../service/credit-card.service';
import { CreditCard } from '../entity/credit-card.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import {
  CreateCreditCardDto,
  UpdateCreditCardDto,
} from '../dto/credit-card.dto';

@ApiTags('Credit Cards')
@Controller('api/v1/credit-cards')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tarjetas de crédito' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todas las tarjetas de crédito',
    type: [CreditCard],
  })
  findAll(): Promise<CreditCard[]> {
    return this.creditCardService.findAll();
  }

  @Get(':userID')
  @ApiOperation({
    summary: 'Obtener tarjetas de crédito por ID de usuario',
    description: 'Ejemplo de solicitud:\n\n```json\nGET /credit-cards/1\n```',
  })
  @ApiParam({
    name: 'userID',
    description:
      'ID del usuario para el que se desean obtener las tarjetas de crédito',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve las tarjetas de crédito del usuario',
    type: [CreditCard],
  })
  findByUserID(@Param('userID') userID: number): Promise<CreditCard[]> {
    return this.creditCardService.findByUserID(userID);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva tarjeta de crédito',
    description:
      'Ejemplo de solicitud:\n\n```json\nPOST /credit-cards\n{\n  "cardNumber": "1234567890123456",\n  "expirationDate": "12/25",\n  "cvv": "123",\n  "userID": 1\n}\n```',
  })
  @ApiBody({
    type: CreateCreditCardDto,
    description: 'Datos de la tarjeta de crédito a crear',
  })
  @ApiResponse({
    status: 201,
    description: 'Tarjeta de crédito creada exitosamente',
    type: CreditCard,
  })
  create(
    @Body() createCreditCardDto: CreateCreditCardDto,
  ): Promise<CreditCard> {
    return this.creditCardService.create(createCreditCardDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar una tarjeta de crédito por su ID',
    description:
      'Ejemplo de solicitud:\n\n```json\nPUT /credit-cards/1\n{\n  "cardNumber": "9876543210987654",\n  "expirationDate": "12/30",\n  "cvv": "456",\n  "userID": 2\n}\n```',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la tarjeta de crédito que se desea actualizar',
  })
  @ApiBody({
    type: UpdateCreditCardDto,
    description: 'Datos actualizados de la tarjeta de crédito',
  })
  @ApiResponse({
    status: 200,
    description: 'Tarjeta de crédito actualizada exitosamente',
    type: CreditCard,
  })
  update(
    @Param('id') id: number,
    @Body() updateCreditCardDto: CreateCreditCardDto,
  ): Promise<CreditCard> {
    return this.creditCardService.update(id, updateCreditCardDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una tarjeta de crédito por su ID',
    description:
      'Ejemplo de solicitud:\n\n```json\nDELETE /credit-cards/1\n```',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la tarjeta de crédito que se desea eliminar',
  })
  @ApiResponse({
    status: 204,
    description: 'Tarjeta de crédito eliminada exitosamente',
  })
  async remove(@Param('id') id: number): Promise<void> {
    await this.creditCardService.remove(id);
  }
}
