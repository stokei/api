import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllCartsItemsService } from '.';

describe('FindAllCartsItemsService', () => {
  let findAllCartsItemsService: FindAllCartsItemsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllCartsItemsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllCartsItemsService = modRef.get(FindAllCartsItemsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllCartsItemsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
