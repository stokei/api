import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindProductsImageByIdService } from '.';

describe('FindProductsImageByIdService', () => {
  let findProductsImageByIdService: FindProductsImageByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindProductsImageByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findProductsImageByIdService = modRef.get(FindProductsImageByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findProductsImageByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
