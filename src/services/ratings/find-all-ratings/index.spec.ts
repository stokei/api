import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllRatingsService } from '.';

describe('FindAllRatingsService', () => {
  let findAllRatingsService: FindAllRatingsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllRatingsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllRatingsService = modRef.get(FindAllRatingsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllRatingsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
