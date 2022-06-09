import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllCheckoutsCurrenciesService } from '.';

describe('FindAllCheckoutsCurrenciesService', () => {
  let findAllCheckoutsCurrenciesService: FindAllCheckoutsCurrenciesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllCheckoutsCurrenciesService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllCheckoutsCurrenciesService = modRef.get(
      FindAllCheckoutsCurrenciesService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllCheckoutsCurrenciesService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
