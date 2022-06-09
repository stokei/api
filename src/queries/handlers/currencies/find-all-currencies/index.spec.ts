import { Test } from '@nestjs/testing';

import { CountCurrenciesRepository } from '@/repositories/currencies/count-currencies';
import { FindAllCurrenciesRepository } from '@/repositories/currencies/find-all-currencies';

import { FindAllCurrenciesQueryHandler } from '.';

describe('FindAllCurrenciesQueryHandler', () => {
  let findAllCurrenciesRepository: FindAllCurrenciesRepository;
  let findAllCurrenciesQueryHandler: FindAllCurrenciesQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllCurrenciesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountCurrenciesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllCurrenciesQueryHandler
      ]
    }).compile();

    findAllCurrenciesRepository = moduleRef.get(FindAllCurrenciesRepository);
    findAllCurrenciesQueryHandler = moduleRef.get(
      FindAllCurrenciesQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllCurrenciesQueryHandler).toBeDefined();
    expect(findAllCurrenciesRepository).toBeDefined();
  });
});
