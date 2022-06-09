import { Test } from '@nestjs/testing';

import { CountCheckoutsCurrenciesRepository } from '@/repositories/checkouts-currencies/count-checkouts-currencies';
import { FindAllCheckoutsCurrenciesRepository } from '@/repositories/checkouts-currencies/find-all-checkouts-currencies';

import { FindAllCheckoutsCurrenciesQueryHandler } from '.';

describe('FindAllCheckoutsCurrenciesQueryHandler', () => {
  let findAllCheckoutsCurrenciesRepository: FindAllCheckoutsCurrenciesRepository;
  let findAllCheckoutsCurrenciesQueryHandler: FindAllCheckoutsCurrenciesQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllCheckoutsCurrenciesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountCheckoutsCurrenciesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllCheckoutsCurrenciesQueryHandler
      ]
    }).compile();

    findAllCheckoutsCurrenciesRepository = moduleRef.get(
      FindAllCheckoutsCurrenciesRepository
    );
    findAllCheckoutsCurrenciesQueryHandler = moduleRef.get(
      FindAllCheckoutsCurrenciesQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllCheckoutsCurrenciesQueryHandler).toBeDefined();
    expect(findAllCheckoutsCurrenciesRepository).toBeDefined();
  });
});
