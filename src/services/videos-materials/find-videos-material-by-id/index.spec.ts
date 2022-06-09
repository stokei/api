import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindVideosMaterialByIdService } from '.';

describe('FindVideosMaterialByIdService', () => {
  let findVideosMaterialByIdService: FindVideosMaterialByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindVideosMaterialByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findVideosMaterialByIdService = modRef.get(FindVideosMaterialByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findVideosMaterialByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
