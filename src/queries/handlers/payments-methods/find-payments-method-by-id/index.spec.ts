import { FindPaymentsMethodByIdRepository } from '@/repositories/payments-methods/find-payments-method-by-id';
import { Test } from '@nestjs/testing';
import { FindPaymentsMethodByIdQueryHandler } from '.';

describe('FindPaymentsMethodByIdQueryHandler', () => {
  let findPaymentsMethodByIdRepository: FindPaymentsMethodByIdRepository;
  let findPaymentsMethodByIdQueryHandler: FindPaymentsMethodByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindPaymentsMethodByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindPaymentsMethodByIdQueryHandler
      ]
    }).compile();

    findPaymentsMethodByIdRepository = moduleRef.get(
      FindPaymentsMethodByIdRepository
    );
    findPaymentsMethodByIdQueryHandler = moduleRef.get(
      FindPaymentsMethodByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findPaymentsMethodByIdQueryHandler).toBeDefined();
    expect(findPaymentsMethodByIdRepository).toBeDefined();
  });
});
