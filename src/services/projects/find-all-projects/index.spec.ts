import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllProjectsService } from '.';

describe('FindAllProjectsService', () => {
  let findAllProjectsService: FindAllProjectsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllProjectsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllProjectsService = modRef.get(FindAllProjectsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllProjectsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
