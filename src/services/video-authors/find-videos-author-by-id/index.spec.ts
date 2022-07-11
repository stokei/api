import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindVideoAuthorByIdService } from '.';

describe('FindVideoAuthorByIdService', () => {
  let findVideoAuthorByIdService: FindVideoAuthorByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindVideoAuthorByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findVideoAuthorByIdService = modRef.get(FindVideoAuthorByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findVideoAuthorByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
