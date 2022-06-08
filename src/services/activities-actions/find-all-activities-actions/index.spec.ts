import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllActivitiesActionsService } from '.';

describe('FindAllActivitiesActionsService', () => {
  let findAllActivitiesActionsService: FindAllActivitiesActionsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllActivitiesActionsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllActivitiesActionsService = modRef.get(
      FindAllActivitiesActionsService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllActivitiesActionsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
