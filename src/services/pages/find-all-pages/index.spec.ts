import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllPagesService } from '.';

describe('FindAllPagesService', () => {
  let findAllPagesService: FindAllPagesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllPagesService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllPagesService = modRef.get(FindAllPagesService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllPagesService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
