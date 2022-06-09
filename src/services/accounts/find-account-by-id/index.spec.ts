import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAccountByIdService } from '.';

describe('FindAccountByIdService', () => {
  let findAccountByIdService: FindAccountByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAccountByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAccountByIdService = modRef.get(FindAccountByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAccountByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
