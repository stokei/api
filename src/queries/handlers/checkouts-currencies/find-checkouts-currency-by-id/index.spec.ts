import { FindCheckoutsCurrencyByIdRepository } from '@/repositories/checkouts-currencies/find-checkouts-currency-by-id';
import { Test } from '@nestjs/testing';
import { FindCheckoutsCurrencyByIdQueryHandler } from '.';

describe('FindCheckoutsCurrencyByIdQueryHandler', () => {
  let findCheckoutsCurrencyByIdRepository: FindCheckoutsCurrencyByIdRepository;
  let findCheckoutsCurrencyByIdQueryHandler: FindCheckoutsCurrencyByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindCheckoutsCurrencyByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindCheckoutsCurrencyByIdQueryHandler
      ]
    }).compile();

    findCheckoutsCurrencyByIdRepository = moduleRef.get(
      FindCheckoutsCurrencyByIdRepository
    );
    findCheckoutsCurrencyByIdQueryHandler = moduleRef.get(
      FindCheckoutsCurrencyByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findCheckoutsCurrencyByIdQueryHandler).toBeDefined();
    expect(findCheckoutsCurrencyByIdRepository).toBeDefined();
  });
});
