import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { LoginDto } from '../../dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login puedes realizarlo por correo o usuario',
  })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.validateUser(
      loginDto.userOrEmail,
      loginDto.password,
    );
  }
}
