import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindFileByIdService } from '.';

describe('FindFileByIdService', () => {
  let findFileByIdService: FindFileByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindFileByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findFileByIdService = modRef.get(FindFileByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findFileByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
