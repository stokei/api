import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindOrdersSellerByIdService } from '.';

describe('FindOrdersSellerByIdService', () => {
  let findOrdersSellerByIdService: FindOrdersSellerByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindOrdersSellerByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findOrdersSellerByIdService = modRef.get(FindOrdersSellerByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findOrdersSellerByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
