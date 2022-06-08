import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllProductsTagsService } from '.';

describe('FindAllProductsTagsService', () => {
  let findAllProductsTagsService: FindAllProductsTagsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllProductsTagsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllProductsTagsService = modRef.get(FindAllProductsTagsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllProductsTagsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
