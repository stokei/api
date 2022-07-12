import { Test } from '@nestjs/testing';

import { FindCartItemByIdRepository } from '@/repositories/cart-items/find-cart-item-by-id';

import { FindCartItemByIdQueryHandler } from '.';

describe('FindCartItemByIdQueryHandler', () => {
  let findCartItemByIdRepository: FindCartItemByIdRepository;
  let findCartItemByIdQueryHandler: FindCartItemByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindCartItemByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindCartItemByIdQueryHandler
      ]
    }).compile();

    findCartItemByIdRepository = moduleRef.get(FindCartItemByIdRepository);
    findCartItemByIdQueryHandler = moduleRef.get(FindCartItemByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findCartItemByIdQueryHandler).toBeDefined();
    expect(findCartItemByIdRepository).toBeDefined();
  });
});
