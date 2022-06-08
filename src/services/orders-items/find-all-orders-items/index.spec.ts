import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllOrdersItemsService } from '.';

describe('FindAllOrdersItemsService', () => {
  let findAllOrdersItemsService: FindAllOrdersItemsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllOrdersItemsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllOrdersItemsService = modRef.get(FindAllOrdersItemsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllOrdersItemsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
