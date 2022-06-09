import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllPricesService } from '.';

describe('FindAllPricesService', () => {
  let findAllPricesService: FindAllPricesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllPricesService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllPricesService = modRef.get(FindAllPricesService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllPricesService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
