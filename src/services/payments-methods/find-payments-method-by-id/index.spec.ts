import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindPaymentsMethodByIdService } from '.';

describe('FindPaymentsMethodByIdService', () => {
  let findPaymentsMethodByIdService: FindPaymentsMethodByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindPaymentsMethodByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findPaymentsMethodByIdService = modRef.get(FindPaymentsMethodByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findPaymentsMethodByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
