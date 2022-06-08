import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindProductsCategoryByIdService } from '.';

describe('FindProductsCategoryByIdService', () => {
  let findProductsCategoryByIdService: FindProductsCategoryByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindProductsCategoryByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findProductsCategoryByIdService = modRef.get(
      FindProductsCategoryByIdService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findProductsCategoryByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
