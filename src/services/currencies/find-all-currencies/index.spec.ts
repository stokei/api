import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllCurrenciesService } from '.';

describe('FindAllCurrenciesService', () => {
  let findAllCurrenciesService: FindAllCurrenciesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllCurrenciesService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllCurrenciesService = modRef.get(FindAllCurrenciesService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllCurrenciesService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
