import { CountActivitiesActionsRepository } from '@/repositories/activities-actions/count-activities-actions';
import { FindAllActivitiesActionsRepository } from '@/repositories/activities-actions/find-all-activities-actions';
import { Test } from '@nestjs/testing';
import { FindAllActivitiesActionsQueryHandler } from '.';

describe('FindAllActivitiesActionsQueryHandler', () => {
  let findAllActivitiesActionsRepository: FindAllActivitiesActionsRepository;
  let findAllActivitiesActionsQueryHandler: FindAllActivitiesActionsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllActivitiesActionsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountActivitiesActionsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllActivitiesActionsQueryHandler
      ]
    }).compile();

    findAllActivitiesActionsRepository = moduleRef.get(
      FindAllActivitiesActionsRepository
    );
    findAllActivitiesActionsQueryHandler = moduleRef.get(
      FindAllActivitiesActionsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllActivitiesActionsQueryHandler).toBeDefined();
    expect(findAllActivitiesActionsRepository).toBeDefined();
  });
});
