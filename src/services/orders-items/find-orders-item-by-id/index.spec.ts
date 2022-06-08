import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindOrdersItemByIdService } from '.';

describe('FindOrdersItemByIdService', () => {
  let findOrdersItemByIdService: FindOrdersItemByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindOrdersItemByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findOrdersItemByIdService = modRef.get(FindOrdersItemByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findOrdersItemByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
