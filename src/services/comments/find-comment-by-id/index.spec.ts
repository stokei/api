import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindCommentByIdService } from '.';

describe('FindCommentByIdService', () => {
  let findCommentByIdService: FindCommentByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindCommentByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findCommentByIdService = modRef.get(FindCommentByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findCommentByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
