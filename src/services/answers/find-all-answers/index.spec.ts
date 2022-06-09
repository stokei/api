import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllAnswersService } from '.';

describe('FindAllAnswersService', () => {
  let findAllAnswersService: FindAllAnswersService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllAnswersService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllAnswersService = modRef.get(FindAllAnswersService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllAnswersService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
