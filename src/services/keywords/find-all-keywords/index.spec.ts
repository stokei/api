import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllKeywordsService } from '.';

describe('FindAllKeywordsService', () => {
  let findAllKeywordsService: FindAllKeywordsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllKeywordsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllKeywordsService = modRef.get(FindAllKeywordsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllKeywordsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
