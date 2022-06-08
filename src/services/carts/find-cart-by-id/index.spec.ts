import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindCartByIdService } from '.';

describe('FindCartByIdService', () => {
  let findCartByIdService: FindCartByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindCartByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findCartByIdService = modRef.get(FindCartByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findCartByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
