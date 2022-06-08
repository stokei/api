import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindKeywordByIdService } from '.';

describe('FindKeywordByIdService', () => {
  let findKeywordByIdService: FindKeywordByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindKeywordByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findKeywordByIdService = modRef.get(FindKeywordByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findKeywordByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
