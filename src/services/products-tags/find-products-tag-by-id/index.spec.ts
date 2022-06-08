import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindProductsTagByIdService } from '.';

describe('FindProductsTagByIdService', () => {
  let findProductsTagByIdService: FindProductsTagByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindProductsTagByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findProductsTagByIdService = modRef.get(FindProductsTagByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findProductsTagByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
