import { CountProductsRepository } from '@/repositories/products/count-products';
import { FindAllProductsRepository } from '@/repositories/products/find-all-products';
import { Test } from '@nestjs/testing';
import { FindAllProductsQueryHandler } from '.';

describe('FindAllProductsQueryHandler', () => {
  let findAllProductsRepository: FindAllProductsRepository;
  let findAllProductsQueryHandler: FindAllProductsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllProductsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountProductsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllProductsQueryHandler
      ]
    }).compile();

    findAllProductsRepository = moduleRef.get(FindAllProductsRepository);
    findAllProductsQueryHandler = moduleRef.get(FindAllProductsQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllProductsQueryHandler).toBeDefined();
    expect(findAllProductsRepository).toBeDefined();
  });
});
