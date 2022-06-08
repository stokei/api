import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllOrdersSellersService } from '.';

describe('FindAllOrdersSellersService', () => {
  let findAllOrdersSellersService: FindAllOrdersSellersService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllOrdersSellersService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllOrdersSellersService = modRef.get(FindAllOrdersSellersService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllOrdersSellersService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
