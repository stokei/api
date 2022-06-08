import { FindPlanByIdRepository } from '@/repositories/plans/find-plan-by-id';
import { Test } from '@nestjs/testing';
import { FindPlanByIdQueryHandler } from '.';

describe('FindPlanByIdQueryHandler', () => {
  let findPlanByIdRepository: FindPlanByIdRepository;
  let findPlanByIdQueryHandler: FindPlanByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindPlanByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindPlanByIdQueryHandler
      ]
    }).compile();

    findPlanByIdRepository = moduleRef.get(FindPlanByIdRepository);
    findPlanByIdQueryHandler = moduleRef.get(FindPlanByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findPlanByIdQueryHandler).toBeDefined();
    expect(findPlanByIdRepository).toBeDefined();
  });
});
