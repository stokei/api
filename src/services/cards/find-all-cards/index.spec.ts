import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllCardsService } from '.';

describe('FindAllCardsService', () => {
  let findAllCardsService: FindAllCardsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllCardsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllCardsService = modRef.get(FindAllCardsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllCardsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
