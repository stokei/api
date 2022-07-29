import { Test } from '@nestjs/testing';

import { CountSubscriptionContractsRepository } from '@/repositories/subscription-contracts/count-subscription-contracts';
import { FindAllSubscriptionContractsRepository } from '@/repositories/subscription-contracts/find-all-subscription-contracts';

import { FindAllSubscriptionContractsQueryHandler } from '.';

describe('FindAllSubscriptionContractsQueryHandler', () => {
  let findAllSubscriptionContractsRepository: FindAllSubscriptionContractsRepository;
  let findAllSubscriptionContractsQueryHandler: FindAllSubscriptionContractsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllSubscriptionContractsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountSubscriptionContractsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllSubscriptionContractsQueryHandler
      ]
    }).compile();

    findAllSubscriptionContractsRepository = moduleRef.get(
      FindAllSubscriptionContractsRepository
    );
    findAllSubscriptionContractsQueryHandler = moduleRef.get(
      FindAllSubscriptionContractsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllSubscriptionContractsQueryHandler).toBeDefined();
    expect(findAllSubscriptionContractsRepository).toBeDefined();
  });
});
