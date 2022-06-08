import { CountProductsTagsRepository } from '@/repositories/products-tags/count-products-tags';
import { FindAllProductsTagsRepository } from '@/repositories/products-tags/find-all-products-tags';
import { Test } from '@nestjs/testing';
import { FindAllProductsTagsQueryHandler } from '.';

describe('FindAllProductsTagsQueryHandler', () => {
  let findAllProductsTagsRepository: FindAllProductsTagsRepository;
  let findAllProductsTagsQueryHandler: FindAllProductsTagsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllProductsTagsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountProductsTagsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllProductsTagsQueryHandler
      ]
    }).compile();

    findAllProductsTagsRepository = moduleRef.get(
      FindAllProductsTagsRepository
    );
    findAllProductsTagsQueryHandler = moduleRef.get(
      FindAllProductsTagsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllProductsTagsQueryHandler).toBeDefined();
    expect(findAllProductsTagsRepository).toBeDefined();
  });
});
