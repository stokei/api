import { Test } from '@nestjs/testing';

import { CountCartItemsRepository } from '@/repositories/cart-items/count-cart-items';
import { FindAllCartItemsRepository } from '@/repositories/cart-items/find-all-cart-items';

import { FindAllCartItemsQueryHandler } from '.';

describe('FindAllCartItemsQueryHandler', () => {
  let findAllCartItemsRepository: FindAllCartItemsRepository;
  let findAllCartItemsQueryHandler: FindAllCartItemsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllCartItemsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountCartItemsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllCartItemsQueryHandler
      ]
    }).compile();

    findAllCartItemsRepository = moduleRef.get(FindAllCartItemsRepository);
    findAllCartItemsQueryHandler = moduleRef.get(FindAllCartItemsQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllCartItemsQueryHandler).toBeDefined();
    expect(findAllCartItemsRepository).toBeDefined();
  });
});
