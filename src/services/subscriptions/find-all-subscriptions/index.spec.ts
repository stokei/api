import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllSubscriptionsService } from '.';

describe('FindAllSubscriptionsService', () => {
  let findAllSubscriptionsService: FindAllSubscriptionsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllSubscriptionsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllSubscriptionsService = modRef.get(FindAllSubscriptionsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllSubscriptionsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
