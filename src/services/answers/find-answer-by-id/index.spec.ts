import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAnswerByIdService } from '.';

describe('FindAnswerByIdService', () => {
  let findAnswerByIdService: FindAnswerByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAnswerByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAnswerByIdService = modRef.get(FindAnswerByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAnswerByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
