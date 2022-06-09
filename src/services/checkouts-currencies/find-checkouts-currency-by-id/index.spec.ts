import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindCheckoutsCurrencyByIdService } from '.';

describe('FindCheckoutsCurrencyByIdService', () => {
  let findCheckoutsCurrencyByIdService: FindCheckoutsCurrencyByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindCheckoutsCurrencyByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findCheckoutsCurrencyByIdService = modRef.get(
      FindCheckoutsCurrencyByIdService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findCheckoutsCurrencyByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
