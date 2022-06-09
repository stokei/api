import { Test } from '@nestjs/testing';

import { FindProductsTagByIdRepository } from '@/repositories/products-tags/find-products-tag-by-id';

import { FindProductsTagByIdQueryHandler } from '.';

describe('FindProductsTagByIdQueryHandler', () => {
  let findProductsTagByIdRepository: FindProductsTagByIdRepository;
  let findProductsTagByIdQueryHandler: FindProductsTagByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindProductsTagByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindProductsTagByIdQueryHandler
      ]
    }).compile();

    findProductsTagByIdRepository = moduleRef.get(
      FindProductsTagByIdRepository
    );
    findProductsTagByIdQueryHandler = moduleRef.get(
      FindProductsTagByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findProductsTagByIdQueryHandler).toBeDefined();
    expect(findProductsTagByIdRepository).toBeDefined();
  });
});
