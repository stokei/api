import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindCurrencyByIdService } from '.';

describe('FindCurrencyByIdService', () => {
  let findCurrencyByIdService: FindCurrencyByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindCurrencyByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findCurrencyByIdService = modRef.get(FindCurrencyByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findCurrencyByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
