import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindSubscriptionByIdService } from '.';

describe('FindSubscriptionByIdService', () => {
  let findSubscriptionByIdService: FindSubscriptionByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindSubscriptionByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findSubscriptionByIdService = modRef.get(FindSubscriptionByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findSubscriptionByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
