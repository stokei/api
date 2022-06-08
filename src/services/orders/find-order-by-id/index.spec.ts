import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindOrderByIdService } from '.';

describe('FindOrderByIdService', () => {
  let findOrderByIdService: FindOrderByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindOrderByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findOrderByIdService = modRef.get(FindOrderByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findOrderByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
