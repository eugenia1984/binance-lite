import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO, UpdateUserDTO } from '../../dto/users.dto';

@ApiTags('Users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Lista todos los usuarios registrados',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Busca usuarios por id',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post('/register')
  @ApiOperation({
    summary: 'Crear usuario',
  })
  create(@Body() user: CreateUserDTO) {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Modificar usuario por id',
  })
  update(@Param('id') id: string, @Body() user: UpdateUserDTO) {
    return this.usersService.update(+id, user);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete usuario por id',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}
