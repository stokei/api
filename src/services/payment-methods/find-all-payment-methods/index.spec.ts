import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllPaymentMethodsService } from '.';

describe('FindAllPaymentMethodsService', () => {
  let findAllPaymentMethodsService: FindAllPaymentMethodsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllPaymentMethodsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllPaymentMethodsService = modRef.get(FindAllPaymentMethodsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllPaymentMethodsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
