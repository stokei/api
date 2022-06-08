import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindRatingByIdService } from '.';

describe('FindRatingByIdService', () => {
  let findRatingByIdService: FindRatingByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindRatingByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findRatingByIdService = modRef.get(FindRatingByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findRatingByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
