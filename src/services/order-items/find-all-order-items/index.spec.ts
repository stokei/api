import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllOrderItemsService } from '.';

describe('FindAllOrderItemsService', () => {
  let findAllOrderItemsService: FindAllOrderItemsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllOrderItemsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllOrderItemsService = modRef.get(FindAllOrderItemsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllOrderItemsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
