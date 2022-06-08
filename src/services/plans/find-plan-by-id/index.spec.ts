import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindPlanByIdService } from '.';

describe('FindPlanByIdService', () => {
  let findPlanByIdService: FindPlanByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindPlanByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findPlanByIdService = modRef.get(FindPlanByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findPlanByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
