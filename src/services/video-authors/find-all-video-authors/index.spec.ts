import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllVideoAuthorsService } from '.';

describe('FindAllVideoAuthorsService', () => {
  let findAllVideoAuthorsService: FindAllVideoAuthorsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllVideoAuthorsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllVideoAuthorsService = modRef.get(FindAllVideoAuthorsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllVideoAuthorsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
