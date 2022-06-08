import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllProductsService } from '.';

describe('FindAllProductsService', () => {
  let findAllProductsService: FindAllProductsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllProductsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllProductsService = modRef.get(FindAllProductsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllProductsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
