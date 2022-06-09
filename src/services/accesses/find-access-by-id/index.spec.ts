import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAccessByIdService } from '.';

describe('FindAccessByIdService', () => {
  let findAccessByIdService: FindAccessByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAccessByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAccessByIdService = modRef.get(FindAccessByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAccessByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
