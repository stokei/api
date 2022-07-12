import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllCartItemsService } from '.';

describe('FindAllCartItemsService', () => {
  let findAllCartItemsService: FindAllCartItemsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllCartItemsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllCartItemsService = modRef.get(FindAllCartItemsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllCartItemsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
