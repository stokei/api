import { Test } from '@nestjs/testing';

import { CountPaymentsRepository } from '@/repositories/payments/count-payments';
import { FindAllPaymentsRepository } from '@/repositories/payments/find-all-payments';

import { FindAllPaymentsQueryHandler } from '.';

describe('FindAllPaymentsQueryHandler', () => {
  let findAllPaymentsRepository: FindAllPaymentsRepository;
  let findAllPaymentsQueryHandler: FindAllPaymentsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllPaymentsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountPaymentsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllPaymentsQueryHandler
      ]
    }).compile();

    findAllPaymentsRepository = moduleRef.get(FindAllPaymentsRepository);
    findAllPaymentsQueryHandler = moduleRef.get(FindAllPaymentsQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllPaymentsQueryHandler).toBeDefined();
    expect(findAllPaymentsRepository).toBeDefined();
  });
});
