import { CountActivitiesRepository } from '@/repositories/activities/count-activities';
import { FindAllActivitiesRepository } from '@/repositories/activities/find-all-activities';
import { Test } from '@nestjs/testing';
import { FindAllActivitiesQueryHandler } from '.';

describe('FindAllActivitiesQueryHandler', () => {
  let findAllActivitiesRepository: FindAllActivitiesRepository;
  let findAllActivitiesQueryHandler: FindAllActivitiesQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllActivitiesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountActivitiesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllActivitiesQueryHandler
      ]
    }).compile();

    findAllActivitiesRepository = moduleRef.get(FindAllActivitiesRepository);
    findAllActivitiesQueryHandler = moduleRef.get(
      FindAllActivitiesQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllActivitiesQueryHandler).toBeDefined();
    expect(findAllActivitiesRepository).toBeDefined();
  });
});
