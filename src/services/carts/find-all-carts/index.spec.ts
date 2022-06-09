import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllCartsService } from '.';

describe('FindAllCartsService', () => {
  let findAllCartsService: FindAllCartsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllCartsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllCartsService = modRef.get(FindAllCartsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllCartsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
