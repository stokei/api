import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindSubscriptionContractByIdService } from '.';

describe('FindSubscriptionContractByIdService', () => {
  let findSubscriptionContractByIdService: FindSubscriptionContractByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindSubscriptionContractByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findSubscriptionContractByIdService = modRef.get(
      FindSubscriptionContractByIdService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findSubscriptionContractByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
