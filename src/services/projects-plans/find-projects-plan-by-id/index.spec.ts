import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindProjectsPlanByIdService } from '.';

describe('FindProjectsPlanByIdService', () => {
  let findProjectsPlanByIdService: FindProjectsPlanByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindProjectsPlanByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findProjectsPlanByIdService = modRef.get(FindProjectsPlanByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findProjectsPlanByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
