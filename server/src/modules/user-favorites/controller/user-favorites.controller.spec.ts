import { Test, TestingModule } from '@nestjs/testing';
import { UserFavoritesController } from './user-favorites.controller';

describe('UserFavoritesController', () => {
  let controller: UserFavoritesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFavoritesController],
    }).compile();

    controller = module.get<UserFavoritesController>(UserFavoritesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
