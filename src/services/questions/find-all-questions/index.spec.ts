import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllQuestionsService } from '.';

describe('FindAllQuestionsService', () => {
  let findAllQuestionsService: FindAllQuestionsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllQuestionsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllQuestionsService = modRef.get(FindAllQuestionsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllQuestionsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
