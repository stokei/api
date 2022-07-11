import { Test } from '@nestjs/testing';

import { FindPaymentMethodByIdRepository } from '@/repositories/payment-methods/find-payment-method-by-id';

import { FindPaymentMethodByIdQueryHandler } from '.';

describe('FindPaymentMethodByIdQueryHandler', () => {
  let findPaymentMethodByIdRepository: FindPaymentMethodByIdRepository;
  let findPaymentMethodByIdQueryHandler: FindPaymentMethodByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindPaymentMethodByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindPaymentMethodByIdQueryHandler
      ]
    }).compile();

    findPaymentMethodByIdRepository = moduleRef.get(
      FindPaymentMethodByIdRepository
    );
    findPaymentMethodByIdQueryHandler = moduleRef.get(
      FindPaymentMethodByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findPaymentMethodByIdQueryHandler).toBeDefined();
    expect(findPaymentMethodByIdRepository).toBeDefined();
  });
});
