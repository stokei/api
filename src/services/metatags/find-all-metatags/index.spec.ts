import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllMetatagsService } from '.';

describe('FindAllMetatagsService', () => {
  let findAllMetatagsService: FindAllMetatagsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllMetatagsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllMetatagsService = modRef.get(FindAllMetatagsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllMetatagsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
