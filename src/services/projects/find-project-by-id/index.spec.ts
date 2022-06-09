import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindProjectByIdService } from '.';

describe('FindProjectByIdService', () => {
  let findProjectByIdService: FindProjectByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindProjectByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findProjectByIdService = modRef.get(FindProjectByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findProjectByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
