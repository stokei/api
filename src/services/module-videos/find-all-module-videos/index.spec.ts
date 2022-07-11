import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllModuleVideosService } from '.';

describe('FindAllModuleVideosService', () => {
  let findAllModuleVideosService: FindAllModuleVideosService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllModuleVideosService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllModuleVideosService = modRef.get(FindAllModuleVideosService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllModuleVideosService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
