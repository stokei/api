import { CountPaymentsMethodsRepository } from '@/repositories/payments-methods/count-payments-methods';
import { FindAllPaymentsMethodsRepository } from '@/repositories/payments-methods/find-all-payments-methods';
import { Test } from '@nestjs/testing';
import { FindAllPaymentsMethodsQueryHandler } from '.';

describe('FindAllPaymentsMethodsQueryHandler', () => {
  let findAllPaymentsMethodsRepository: FindAllPaymentsMethodsRepository;
  let findAllPaymentsMethodsQueryHandler: FindAllPaymentsMethodsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllPaymentsMethodsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountPaymentsMethodsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllPaymentsMethodsQueryHandler
      ]
    }).compile();

    findAllPaymentsMethodsRepository = moduleRef.get(
      FindAllPaymentsMethodsRepository
    );
    findAllPaymentsMethodsQueryHandler = moduleRef.get(
      FindAllPaymentsMethodsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllPaymentsMethodsQueryHandler).toBeDefined();
    expect(findAllPaymentsMethodsRepository).toBeDefined();
  });
});
