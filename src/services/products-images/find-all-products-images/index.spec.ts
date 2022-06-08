import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllProductsImagesService } from '.';

describe('FindAllProductsImagesService', () => {
  let findAllProductsImagesService: FindAllProductsImagesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllProductsImagesService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllProductsImagesService = modRef.get(FindAllProductsImagesService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllProductsImagesService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
