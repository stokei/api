import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindCartItemByIdService } from '.';

describe('FindCartItemByIdService', () => {
  let findCartItemByIdService: FindCartItemByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindCartItemByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findCartItemByIdService = modRef.get(FindCartItemByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findCartItemByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
