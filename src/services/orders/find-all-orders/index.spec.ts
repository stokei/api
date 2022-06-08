import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllOrdersService } from '.';

describe('FindAllOrdersService', () => {
  let findAllOrdersService: FindAllOrdersService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllOrdersService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllOrdersService = modRef.get(FindAllOrdersService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllOrdersService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
