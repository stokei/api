import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindActivitiesActionByIdService } from '.';

describe('FindActivitiesActionByIdService', () => {
  let findActivitiesActionByIdService: FindActivitiesActionByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindActivitiesActionByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findActivitiesActionByIdService = modRef.get(
      FindActivitiesActionByIdService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findActivitiesActionByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
