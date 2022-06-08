import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllCheckoutsService } from '.';

describe('FindAllCheckoutsService', () => {
  let findAllCheckoutsService: FindAllCheckoutsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllCheckoutsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllCheckoutsService = modRef.get(FindAllCheckoutsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllCheckoutsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
