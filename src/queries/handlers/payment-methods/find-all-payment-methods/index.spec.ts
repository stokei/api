import { Test } from '@nestjs/testing';

import { CountPaymentMethodsRepository } from '@/repositories/payment-methods/count-payment-methods';
import { FindAllPaymentMethodsRepository } from '@/repositories/payment-methods/find-all-payment-methods';

import { FindAllPaymentMethodsQueryHandler } from '.';

describe('FindAllPaymentMethodsQueryHandler', () => {
  let findAllPaymentMethodsRepository: FindAllPaymentMethodsRepository;
  let findAllPaymentMethodsQueryHandler: FindAllPaymentMethodsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllPaymentMethodsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountPaymentMethodsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllPaymentMethodsQueryHandler
      ]
    }).compile();

    findAllPaymentMethodsRepository = moduleRef.get(
      FindAllPaymentMethodsRepository
    );
    findAllPaymentMethodsQueryHandler = moduleRef.get(
      FindAllPaymentMethodsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllPaymentMethodsQueryHandler).toBeDefined();
    expect(findAllPaymentMethodsRepository).toBeDefined();
  });
});
