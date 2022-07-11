import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindOrderItemByIdService } from '.';

describe('FindOrderItemByIdService', () => {
  let findOrderItemByIdService: FindOrderItemByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindOrderItemByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findOrderItemByIdService = modRef.get(FindOrderItemByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findOrderItemByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
