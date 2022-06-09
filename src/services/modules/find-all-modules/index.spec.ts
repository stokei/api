import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllModulesService } from '.';

describe('FindAllModulesService', () => {
  let findAllModulesService: FindAllModulesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllModulesService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllModulesService = modRef.get(FindAllModulesService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllModulesService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
