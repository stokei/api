import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindModuleVideoByIdService } from '.';

describe('FindModuleVideoByIdService', () => {
  let findModuleVideoByIdService: FindModuleVideoByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindModuleVideoByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findModuleVideoByIdService = modRef.get(FindModuleVideoByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findModuleVideoByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
