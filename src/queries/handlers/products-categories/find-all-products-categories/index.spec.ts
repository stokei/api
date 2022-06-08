import { CountProductsCategoriesRepository } from '@/repositories/products-categories/count-products-categories';
import { FindAllProductsCategoriesRepository } from '@/repositories/products-categories/find-all-products-categories';
import { Test } from '@nestjs/testing';
import { FindAllProductsCategoriesQueryHandler } from '.';

describe('FindAllProductsCategoriesQueryHandler', () => {
  let findAllProductsCategoriesRepository: FindAllProductsCategoriesRepository;
  let findAllProductsCategoriesQueryHandler: FindAllProductsCategoriesQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllProductsCategoriesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountProductsCategoriesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllProductsCategoriesQueryHandler
      ]
    }).compile();

    findAllProductsCategoriesRepository = moduleRef.get(
      FindAllProductsCategoriesRepository
    );
    findAllProductsCategoriesQueryHandler = moduleRef.get(
      FindAllProductsCategoriesQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllProductsCategoriesQueryHandler).toBeDefined();
    expect(findAllProductsCategoriesRepository).toBeDefined();
  });
});
