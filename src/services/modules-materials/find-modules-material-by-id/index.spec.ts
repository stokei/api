import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindModulesMaterialByIdService } from '.';

describe('FindModulesMaterialByIdService', () => {
  let findModulesMaterialByIdService: FindModulesMaterialByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindModulesMaterialByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findModulesMaterialByIdService = modRef.get(FindModulesMaterialByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findModulesMaterialByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
