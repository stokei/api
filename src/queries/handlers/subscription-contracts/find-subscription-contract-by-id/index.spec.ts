import { Test } from '@nestjs/testing';

import { FindSubscriptionContractByIdRepository } from '@/repositories/subscription-contracts/find-subscription-contract-by-id';

import { FindSubscriptionContractByIdQueryHandler } from '.';

describe('FindSubscriptionContractByIdQueryHandler', () => {
  let findSubscriptionContractByIdRepository: FindSubscriptionContractByIdRepository;
  let findSubscriptionContractByIdQueryHandler: FindSubscriptionContractByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindSubscriptionContractByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindSubscriptionContractByIdQueryHandler
      ]
    }).compile();

    findSubscriptionContractByIdRepository = moduleRef.get(
      FindSubscriptionContractByIdRepository
    );
    findSubscriptionContractByIdQueryHandler = moduleRef.get(
      FindSubscriptionContractByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findSubscriptionContractByIdQueryHandler).toBeDefined();
    expect(findSubscriptionContractByIdRepository).toBeDefined();
  });
});
