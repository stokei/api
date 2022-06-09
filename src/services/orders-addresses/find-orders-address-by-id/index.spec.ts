import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindOrdersAddressByIdService } from '.';

describe('FindOrdersAddressByIdService', () => {
  let findOrdersAddressByIdService: FindOrdersAddressByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindOrdersAddressByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findOrdersAddressByIdService = modRef.get(FindOrdersAddressByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findOrdersAddressByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
