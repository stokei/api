import { FindProductsImageByIdRepository } from '@/repositories/products-images/find-products-image-by-id';
import { Test } from '@nestjs/testing';
import { FindProductsImageByIdQueryHandler } from '.';

describe('FindProductsImageByIdQueryHandler', () => {
  let findProductsImageByIdRepository: FindProductsImageByIdRepository;
  let findProductsImageByIdQueryHandler: FindProductsImageByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindProductsImageByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindProductsImageByIdQueryHandler
      ]
    }).compile();

    findProductsImageByIdRepository = moduleRef.get(
      FindProductsImageByIdRepository
    );
    findProductsImageByIdQueryHandler = moduleRef.get(
      FindProductsImageByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findProductsImageByIdQueryHandler).toBeDefined();
    expect(findProductsImageByIdRepository).toBeDefined();
  });
});
