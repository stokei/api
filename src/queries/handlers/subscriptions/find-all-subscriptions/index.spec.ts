import { Test } from '@nestjs/testing';

import { CountSubscriptionsRepository } from '@/repositories/subscriptions/count-subscriptions';
import { FindAllSubscriptionsRepository } from '@/repositories/subscriptions/find-all-subscriptions';

import { FindAllSubscriptionsQueryHandler } from '.';

describe('FindAllSubscriptionsQueryHandler', () => {
  let findAllSubscriptionsRepository: FindAllSubscriptionsRepository;
  let findAllSubscriptionsQueryHandler: FindAllSubscriptionsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllSubscriptionsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountSubscriptionsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllSubscriptionsQueryHandler
      ]
    }).compile();

    findAllSubscriptionsRepository = moduleRef.get(
      FindAllSubscriptionsRepository
    );
    findAllSubscriptionsQueryHandler = moduleRef.get(
      FindAllSubscriptionsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllSubscriptionsQueryHandler).toBeDefined();
    expect(findAllSubscriptionsRepository).toBeDefined();
  });
});
