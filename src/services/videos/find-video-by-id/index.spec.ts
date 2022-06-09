import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindVideoByIdService } from '.';

describe('FindVideoByIdService', () => {
  let findVideoByIdService: FindVideoByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindVideoByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findVideoByIdService = modRef.get(FindVideoByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findVideoByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
