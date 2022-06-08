import { FindProductsCategoryByIdRepository } from '@/repositories/products-categories/find-products-category-by-id';
import { Test } from '@nestjs/testing';
import { FindProductsCategoryByIdQueryHandler } from '.';

describe('FindProductsCategoryByIdQueryHandler', () => {
  let findProductsCategoryByIdRepository: FindProductsCategoryByIdRepository;
  let findProductsCategoryByIdQueryHandler: FindProductsCategoryByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindProductsCategoryByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindProductsCategoryByIdQueryHandler
      ]
    }).compile();

    findProductsCategoryByIdRepository = moduleRef.get(
      FindProductsCategoryByIdRepository
    );
    findProductsCategoryByIdQueryHandler = moduleRef.get(
      FindProductsCategoryByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findProductsCategoryByIdQueryHandler).toBeDefined();
    expect(findProductsCategoryByIdRepository).toBeDefined();
  });
});
