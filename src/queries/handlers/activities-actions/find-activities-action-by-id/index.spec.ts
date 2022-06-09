import { Test } from '@nestjs/testing';

import { FindActivitiesActionByIdRepository } from '@/repositories/activities-actions/find-activities-action-by-id';

import { FindActivitiesActionByIdQueryHandler } from '.';

describe('FindActivitiesActionByIdQueryHandler', () => {
  let findActivitiesActionByIdRepository: FindActivitiesActionByIdRepository;
  let findActivitiesActionByIdQueryHandler: FindActivitiesActionByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindActivitiesActionByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindActivitiesActionByIdQueryHandler
      ]
    }).compile();

    findActivitiesActionByIdRepository = moduleRef.get(
      FindActivitiesActionByIdRepository
    );
    findActivitiesActionByIdQueryHandler = moduleRef.get(
      FindActivitiesActionByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findActivitiesActionByIdQueryHandler).toBeDefined();
    expect(findActivitiesActionByIdRepository).toBeDefined();
  });
});
