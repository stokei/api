import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindCartsItemByIdService } from '.';

describe('FindCartsItemByIdService', () => {
  let findCartsItemByIdService: FindCartsItemByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindCartsItemByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findCartsItemByIdService = modRef.get(FindCartsItemByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findCartsItemByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
