import { FindCategoryByIdRepository } from '@/repositories/categories/find-category-by-id';
import { Test } from '@nestjs/testing';
import { FindCategoryByIdQueryHandler } from '.';

describe('FindCategoryByIdQueryHandler', () => {
  let findCategoryByIdRepository: FindCategoryByIdRepository;
  let findCategoryByIdQueryHandler: FindCategoryByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindCategoryByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindCategoryByIdQueryHandler
      ]
    }).compile();

    findCategoryByIdRepository = moduleRef.get(FindCategoryByIdRepository);
    findCategoryByIdQueryHandler = moduleRef.get(FindCategoryByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findCategoryByIdQueryHandler).toBeDefined();
    expect(findCategoryByIdRepository).toBeDefined();
  });
});
