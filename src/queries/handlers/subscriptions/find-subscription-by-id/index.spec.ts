import { Test } from '@nestjs/testing';

import { FindSubscriptionByIdRepository } from '@/repositories/subscriptions/find-subscription-by-id';

import { FindSubscriptionByIdQueryHandler } from '.';

describe('FindSubscriptionByIdQueryHandler', () => {
  let findSubscriptionByIdRepository: FindSubscriptionByIdRepository;
  let findSubscriptionByIdQueryHandler: FindSubscriptionByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindSubscriptionByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindSubscriptionByIdQueryHandler
      ]
    }).compile();

    findSubscriptionByIdRepository = moduleRef.get(
      FindSubscriptionByIdRepository
    );
    findSubscriptionByIdQueryHandler = moduleRef.get(
      FindSubscriptionByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findSubscriptionByIdQueryHandler).toBeDefined();
    expect(findSubscriptionByIdRepository).toBeDefined();
  });
});
