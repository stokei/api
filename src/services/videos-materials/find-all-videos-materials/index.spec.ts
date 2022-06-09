import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllVideosMaterialsService } from '.';

describe('FindAllVideosMaterialsService', () => {
  let findAllVideosMaterialsService: FindAllVideosMaterialsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllVideosMaterialsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllVideosMaterialsService = modRef.get(FindAllVideosMaterialsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllVideosMaterialsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
