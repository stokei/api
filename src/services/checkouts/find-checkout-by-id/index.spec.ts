import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindCheckoutByIdService } from '.';

describe('FindCheckoutByIdService', () => {
  let findCheckoutByIdService: FindCheckoutByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindCheckoutByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findCheckoutByIdService = modRef.get(FindCheckoutByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findCheckoutByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
