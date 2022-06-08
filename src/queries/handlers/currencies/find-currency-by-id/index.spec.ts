import { FindCurrencyByIdRepository } from '@/repositories/currencies/find-currency-by-id';
import { Test } from '@nestjs/testing';
import { FindCurrencyByIdQueryHandler } from '.';

describe('FindCurrencyByIdQueryHandler', () => {
  let findCurrencyByIdRepository: FindCurrencyByIdRepository;
  let findCurrencyByIdQueryHandler: FindCurrencyByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindCurrencyByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindCurrencyByIdQueryHandler
      ]
    }).compile();

    findCurrencyByIdRepository = moduleRef.get(FindCurrencyByIdRepository);
    findCurrencyByIdQueryHandler = moduleRef.get(FindCurrencyByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findCurrencyByIdQueryHandler).toBeDefined();
    expect(findCurrencyByIdRepository).toBeDefined();
  });
});
