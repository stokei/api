import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindModuleByIdService } from '.';

describe('FindModuleByIdService', () => {
  let findModuleByIdService: FindModuleByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindModuleByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findModuleByIdService = modRef.get(FindModuleByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findModuleByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
