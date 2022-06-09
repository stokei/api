import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllModulesMaterialsService } from '.';

describe('FindAllModulesMaterialsService', () => {
  let findAllModulesMaterialsService: FindAllModulesMaterialsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllModulesMaterialsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllModulesMaterialsService = modRef.get(FindAllModulesMaterialsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllModulesMaterialsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
