import { CountProductsImagesRepository } from '@/repositories/products-images/count-products-images';
import { FindAllProductsImagesRepository } from '@/repositories/products-images/find-all-products-images';
import { Test } from '@nestjs/testing';
import { FindAllProductsImagesQueryHandler } from '.';

describe('FindAllProductsImagesQueryHandler', () => {
  let findAllProductsImagesRepository: FindAllProductsImagesRepository;
  let findAllProductsImagesQueryHandler: FindAllProductsImagesQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllProductsImagesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountProductsImagesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllProductsImagesQueryHandler
      ]
    }).compile();

    findAllProductsImagesRepository = moduleRef.get(
      FindAllProductsImagesRepository
    );
    findAllProductsImagesQueryHandler = moduleRef.get(
      FindAllProductsImagesQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllProductsImagesQueryHandler).toBeDefined();
    expect(findAllProductsImagesRepository).toBeDefined();
  });
});
