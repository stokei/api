import { Test } from '@nestjs/testing';

import { FindCartByIdRepository } from '@/repositories/carts/find-cart-by-id';

import { FindCartByIdQueryHandler } from '.';

describe('FindCartByIdQueryHandler', () => {
  let findCartByIdRepository: FindCartByIdRepository;
  let findCartByIdQueryHandler: FindCartByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindCartByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindCartByIdQueryHandler
      ]
    }).compile();

    findCartByIdRepository = moduleRef.get(FindCartByIdRepository);
    findCartByIdQueryHandler = moduleRef.get(FindCartByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findCartByIdQueryHandler).toBeDefined();
    expect(findCartByIdRepository).toBeDefined();
  });
});
