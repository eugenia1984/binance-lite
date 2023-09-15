import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/services/users/users.service';
import * as bcrypt from 'bcrypt';
import { createResponse } from 'src/core/utils/response.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService, // Inyecta el servicio de JWT
  ) {}

  async validateUser(userOrEmail: string, password: string) {
    try {
      let user = await this.usersService.findOneByUsername(userOrEmail);
      if (!user) {
        user = await this.usersService.findOneByEmail(userOrEmail);
      }

      if (user && (await bcrypt.compare(password, user.passwordHash))) {
        const { passwordHash, ...data } = user;

        // Genera un JWT
        const payload = { username: user.username, sub: user.id }; // Puedes ajustar el payload según tus necesidades
        const token = this.jwtService.sign(payload);

        return createResponse({
          data: {
            ...data,
            token, // Incluye el JWT en la respuesta
          },
          message: 'Login Correcto',
        });
      }
      return createResponse({
        message: 'Credenciales invalidas',
      });
    } catch (error) {
      return createResponse({
        error: error,
        message: 'Ocurrio un error al autenticar',
      });
    }
  }
}
