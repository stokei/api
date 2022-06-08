import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllModulesVideosService } from '.';

describe('FindAllModulesVideosService', () => {
  let findAllModulesVideosService: FindAllModulesVideosService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllModulesVideosService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllModulesVideosService = modRef.get(FindAllModulesVideosService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllModulesVideosService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
