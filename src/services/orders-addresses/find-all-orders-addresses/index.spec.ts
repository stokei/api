import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllOrdersAddressesService } from '.';

describe('FindAllOrdersAddressesService', () => {
  let findAllOrdersAddressesService: FindAllOrdersAddressesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllOrdersAddressesService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllOrdersAddressesService = modRef.get(FindAllOrdersAddressesService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllOrdersAddressesService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
