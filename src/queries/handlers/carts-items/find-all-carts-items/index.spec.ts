import { Test } from '@nestjs/testing';

import { CountCartsItemsRepository } from '@/repositories/carts-items/count-carts-items';
import { FindAllCartsItemsRepository } from '@/repositories/carts-items/find-all-carts-items';

import { FindAllCartsItemsQueryHandler } from '.';

describe('FindAllCartsItemsQueryHandler', () => {
  let findAllCartsItemsRepository: FindAllCartsItemsRepository;
  let findAllCartsItemsQueryHandler: FindAllCartsItemsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllCartsItemsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountCartsItemsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllCartsItemsQueryHandler
      ]
    }).compile();

    findAllCartsItemsRepository = moduleRef.get(FindAllCartsItemsRepository);
    findAllCartsItemsQueryHandler = moduleRef.get(
      FindAllCartsItemsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllCartsItemsQueryHandler).toBeDefined();
    expect(findAllCartsItemsRepository).toBeDefined();
  });
});
