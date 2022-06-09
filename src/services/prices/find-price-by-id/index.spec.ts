import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindPriceByIdService } from '.';

describe('FindPriceByIdService', () => {
  let findPriceByIdService: FindPriceByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindPriceByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findPriceByIdService = modRef.get(FindPriceByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findPriceByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
