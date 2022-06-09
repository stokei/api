import { Test } from '@nestjs/testing';

import { FindPaymentByIdRepository } from '@/repositories/payments/find-payment-by-id';

import { FindPaymentByIdQueryHandler } from '.';

describe('FindPaymentByIdQueryHandler', () => {
  let findPaymentByIdRepository: FindPaymentByIdRepository;
  let findPaymentByIdQueryHandler: FindPaymentByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindPaymentByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindPaymentByIdQueryHandler
      ]
    }).compile();

    findPaymentByIdRepository = moduleRef.get(FindPaymentByIdRepository);
    findPaymentByIdQueryHandler = moduleRef.get(FindPaymentByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findPaymentByIdQueryHandler).toBeDefined();
    expect(findPaymentByIdRepository).toBeDefined();
  });
});
