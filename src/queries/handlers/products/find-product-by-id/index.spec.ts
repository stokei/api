import { Test } from '@nestjs/testing';

import { FindProductByIdRepository } from '@/repositories/products/find-product-by-id';

import { FindProductByIdQueryHandler } from '.';

describe('FindProductByIdQueryHandler', () => {
  let findProductByIdRepository: FindProductByIdRepository;
  let findProductByIdQueryHandler: FindProductByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindProductByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindProductByIdQueryHandler
      ]
    }).compile();

    findProductByIdRepository = moduleRef.get(FindProductByIdRepository);
    findProductByIdQueryHandler = moduleRef.get(FindProductByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findProductByIdQueryHandler).toBeDefined();
    expect(findProductByIdRepository).toBeDefined();
  });
});
