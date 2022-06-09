import { Test } from '@nestjs/testing';

import { CountPricesRepository } from '@/repositories/prices/count-prices';
import { FindAllPricesRepository } from '@/repositories/prices/find-all-prices';

import { FindAllPricesQueryHandler } from '.';

describe('FindAllPricesQueryHandler', () => {
  let findAllPricesRepository: FindAllPricesRepository;
  let findAllPricesQueryHandler: FindAllPricesQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllPricesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountPricesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllPricesQueryHandler
      ]
    }).compile();

    findAllPricesRepository = moduleRef.get(FindAllPricesRepository);
    findAllPricesQueryHandler = moduleRef.get(FindAllPricesQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllPricesQueryHandler).toBeDefined();
    expect(findAllPricesRepository).toBeDefined();
  });
});
