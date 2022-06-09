import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindQuestionByIdService } from '.';

describe('FindQuestionByIdService', () => {
  let findQuestionByIdService: FindQuestionByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindQuestionByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findQuestionByIdService = modRef.get(FindQuestionByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findQuestionByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
