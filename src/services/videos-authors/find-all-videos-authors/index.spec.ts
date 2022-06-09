import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllVideosAuthorsService } from '.';

describe('FindAllVideosAuthorsService', () => {
  let findAllVideosAuthorsService: FindAllVideosAuthorsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllVideosAuthorsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllVideosAuthorsService = modRef.get(FindAllVideosAuthorsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllVideosAuthorsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
