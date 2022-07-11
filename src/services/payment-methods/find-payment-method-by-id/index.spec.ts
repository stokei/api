import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindPaymentMethodByIdService } from '.';

describe('FindPaymentMethodByIdService', () => {
  let findPaymentMethodByIdService: FindPaymentMethodByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindPaymentMethodByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findPaymentMethodByIdService = modRef.get(FindPaymentMethodByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findPaymentMethodByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
