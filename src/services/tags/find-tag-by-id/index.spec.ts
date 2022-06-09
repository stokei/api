import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindTagByIdService } from '.';

describe('FindTagByIdService', () => {
  let findTagByIdService: FindTagByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindTagByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findTagByIdService = modRef.get(FindTagByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findTagByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
