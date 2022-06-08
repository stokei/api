import { FindProjectsPlanByIdRepository } from '@/repositories/projects-plans/find-projects-plan-by-id';
import { Test } from '@nestjs/testing';
import { FindProjectsPlanByIdQueryHandler } from '.';

describe('FindProjectsPlanByIdQueryHandler', () => {
  let findProjectsPlanByIdRepository: FindProjectsPlanByIdRepository;
  let findProjectsPlanByIdQueryHandler: FindProjectsPlanByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindProjectsPlanByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindProjectsPlanByIdQueryHandler
      ]
    }).compile();

    findProjectsPlanByIdRepository = moduleRef.get(
      FindProjectsPlanByIdRepository
    );
    findProjectsPlanByIdQueryHandler = moduleRef.get(
      FindProjectsPlanByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findProjectsPlanByIdQueryHandler).toBeDefined();
    expect(findProjectsPlanByIdRepository).toBeDefined();
  });
});
