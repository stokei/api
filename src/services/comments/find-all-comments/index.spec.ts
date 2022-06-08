import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllCommentsService } from '.';

describe('FindAllCommentsService', () => {
  let findAllCommentsService: FindAllCommentsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllCommentsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllCommentsService = modRef.get(FindAllCommentsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllCommentsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
