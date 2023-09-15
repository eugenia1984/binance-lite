import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFavoritesEntity } from '../entity/user-favorites.entity';
import { Repository, In } from 'typeorm';
import { CreateUserFavoritesDto } from '../dto/user-favorites.dto';
import { CryptocurrencyEntity } from 'src/modules/cryptocurrencies/entity/cryptocurrencies.entity';
import {
  createResponse,
  transformaCamelCaseArrayObjeto,
} from '../../../core/utils/response.util';
import { UserEntity } from 'src/modules/users/entity/users.entity';

@Injectable()
export class UserFavoritesService {
  constructor(
    @InjectRepository(CryptocurrencyEntity)
    private readonly cryptoRepository: Repository<CryptocurrencyEntity>,
    @InjectRepository(UserFavoritesEntity)
    private readonly userFavoritesRepository: Repository<UserFavoritesEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserFavoritesDto) {
    try {
      const cryptoIds = dto.cryptoId;

      // Contar el número actual de criptomonedas favoritas del usuario
      const currentFavorites = await this.userFavoritesRepository.find({
        where: {
          userId: dto.userId,
        },
      });

      const currentFavoritesCount = currentFavorites.length;
      const currentFavoritesIds = currentFavorites.map((fav) => fav.cryptoId);

      // Validar el límite del usuario para las criptomonedas favoritas
      if (currentFavoritesCount + cryptoIds.length > 6) {
        return createResponse({
          error: true,
          message: 'Ya tienes 6 criptomonedas favoritas.',
        });
      }

      // Filtrar IDs que ya existen en los favoritos del usuario
      const newCryptoIds = cryptoIds.filter(
        (id) => !currentFavoritesIds.includes(id),
      );

      // Validar si todos los nuevos cryptoIds existen
      const cryptocurrencies = await this.cryptoRepository.find({
        where: {
          uuid: In(newCryptoIds),
        },
      });

      const validCryptoIds = cryptocurrencies.map((crypto) => crypto.uuid);

      // Filtrar IDs que son válidos (existen en la base de datos)
      const entities = newCryptoIds
        .filter((id) => validCryptoIds.includes(id))
        .map((cryptoId) => {
          const entity = new UserFavoritesEntity();
          entity.userId = dto.userId;
          entity.cryptoId = cryptoId;
          return entity;
        });

      if (entities.length === 0) {
        return createResponse({
          error: true,
          message: 'No se encontraron criptomonedas con los ids enviados.',
        });
      }

      const savedEntities = await this.userFavoritesRepository.save(entities);

      if (!savedEntities) {
        return createResponse({
          error: true,
          message: 'Error al guardar las criptomonedas favoritas',
        });
      }
      return createResponse({
        data: savedEntities,
        message: 'Guardado correctamente',
      });
    } catch (e) {
      return createResponse({
        error: true,
        message:
          'Error al guardar las criptomonedas favoritas contacte al administrador',
      });
    }
  }

  async findAll() {
    return await this.userFavoritesRepository.find();
  }

  async findOne(id: number) {
    const entity = await this.userFavoritesRepository.findOne({
      where: { id },
    });
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }

  //   async update(id: number, dto: UpdateUserFavoritesDto) {
  //     await this.findOne(id); // for NotFoundException
  //     await this.userFavoritesRepository.update(id, { cryptoId: dto.cryptoId });
  //     return this.findOne(id);
  //   }

  async listUserFavorites(userId: number) {
    try {
      // Primero, verifica si el usuario existe
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return createResponse({
          message: `El usuario con ID ${userId} no existe.`,
          error: true,
        });
      }

      // Si el usuario existe, procede a buscar sus monedas favoritas
      const favorites = await this.userFavoritesRepository
        .createQueryBuilder('uf')
        .select([
          'uf.id AS user_favorite_id',
          'u.id AS user_id',
          'c.uuid AS crypto_id',
          'c.name AS name',
          'c.icon_url AS icon_url',
        ])
        .innerJoin('uf.user', 'u')
        .innerJoin('uf.cryptocurrency', 'c')
        .where('uf.userId = :userId', { userId })
        .getRawMany();

      if (!favorites || favorites.length === 0) {
        return createResponse({
          error: true,
          message: `El usuario con ID ${userId} no tiene monedas favoritas.`,
        });
      }

      return createResponse({
        data: transformaCamelCaseArrayObjeto(favorites),
        message: `Listado exitoso ${userId}.`,
      });
    } catch (e) {
      return createResponse({
        error: true,
        message: 'Se produjo un error al listar las monedas favoritas.',
      });
    }
  }

  async deleteUserFavorite(userId: number, cryptoId: string) {
    try {
      // Primero, verifica si el usuario existe
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return createResponse({
          message: `El usuario con ID ${userId} no existe.`,
          error: true,
        });
      }

      // Verifica si la criptomoneda favorita existe para el usuario
      const favorite = await this.userFavoritesRepository.findOne({
        where: { userId, cryptoId },
      });
      if (!favorite) {
        return createResponse({
          message: `La criptomoneda con ID ${cryptoId} no es una favorita para el usuario con ID ${userId}.`,
          error: true,
        });
      }

      // Si existe, procede a eliminarla
      await this.userFavoritesRepository.remove(favorite);

      return createResponse({
        message: `Se ha eliminado la criptomoneda con ID ${cryptoId} de las favoritas del usuario con ID ${userId}.`,
      });
    } catch (e) {
      console.log(e);
      return createResponse({
        error: true,
        message: 'Se produjo un error al eliminar la moneda favorita.',
      });
    }
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // for NotFoundException
    await this.userFavoritesRepository.delete(id);
  }
}
