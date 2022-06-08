import { CountCategoriesRepository } from '@/repositories/categories/count-categories';
import { FindAllCategoriesRepository } from '@/repositories/categories/find-all-categories';
import { Test } from '@nestjs/testing';
import { FindAllCategoriesQueryHandler } from '.';

describe('FindAllCategoriesQueryHandler', () => {
  let findAllCategoriesRepository: FindAllCategoriesRepository;
  let findAllCategoriesQueryHandler: FindAllCategoriesQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllCategoriesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountCategoriesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllCategoriesQueryHandler
      ]
    }).compile();

    findAllCategoriesRepository = moduleRef.get(FindAllCategoriesRepository);
    findAllCategoriesQueryHandler = moduleRef.get(
      FindAllCategoriesQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllCategoriesQueryHandler).toBeDefined();
    expect(findAllCategoriesRepository).toBeDefined();
  });
});
