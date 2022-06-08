import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindProductByIdService } from '.';

describe('FindProductByIdService', () => {
  let findProductByIdService: FindProductByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindProductByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findProductByIdService = modRef.get(FindProductByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findProductByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
