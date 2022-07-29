import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllSubscriptionContractsService } from '.';

describe('FindAllSubscriptionContractsService', () => {
  let findAllSubscriptionContractsService: FindAllSubscriptionContractsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllSubscriptionContractsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllSubscriptionContractsService = modRef.get(
      FindAllSubscriptionContractsService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllSubscriptionContractsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
