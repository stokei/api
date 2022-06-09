import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllActivitiesService } from '.';

describe('FindAllActivitiesService', () => {
  let findAllActivitiesService: FindAllActivitiesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllActivitiesService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllActivitiesService = modRef.get(FindAllActivitiesService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllActivitiesService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
