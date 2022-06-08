import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindPaymentByIdService } from '.';

describe('FindPaymentByIdService', () => {
  let findPaymentByIdService: FindPaymentByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindPaymentByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findPaymentByIdService = modRef.get(FindPaymentByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findPaymentByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
