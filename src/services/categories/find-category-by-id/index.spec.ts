import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindCategoryByIdService } from '.';

describe('FindCategoryByIdService', () => {
  let findCategoryByIdService: FindCategoryByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindCategoryByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findCategoryByIdService = modRef.get(FindCategoryByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findCategoryByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
