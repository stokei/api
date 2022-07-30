import { Test } from '@nestjs/testing';

import { FindPriceByIdRepository } from '@/repositories/prices/find-price-by-id';

import { CalculatePricesInformationQueryHandler } from '.';

describe('CalculatePricesInformationQueryHandler', () => {
  let findPriceByIdRepository: FindPriceByIdRepository;
  let calculatePricesInformationQueryHandler: CalculatePricesInformationQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindPriceByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        CalculatePricesInformationQueryHandler
      ]
    }).compile();

    findPriceByIdRepository = moduleRef.get(FindPriceByIdRepository);
    calculatePricesInformationQueryHandler = moduleRef.get(
      CalculatePricesInformationQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(calculatePricesInformationQueryHandler).toBeDefined();
    expect(findPriceByIdRepository).toBeDefined();
  });
});
