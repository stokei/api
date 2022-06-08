import { FindClassroomsPlanByIdRepository } from '@/repositories/classrooms-plans/find-classrooms-plan-by-id';
import { Test } from '@nestjs/testing';
import { FindClassroomsPlanByIdQueryHandler } from '.';

describe('FindClassroomsPlanByIdQueryHandler', () => {
  let findClassroomsPlanByIdRepository: FindClassroomsPlanByIdRepository;
  let findClassroomsPlanByIdQueryHandler: FindClassroomsPlanByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindClassroomsPlanByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindClassroomsPlanByIdQueryHandler
      ]
    }).compile();

    findClassroomsPlanByIdRepository = moduleRef.get(
      FindClassroomsPlanByIdRepository
    );
    findClassroomsPlanByIdQueryHandler = moduleRef.get(
      FindClassroomsPlanByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findClassroomsPlanByIdQueryHandler).toBeDefined();
    expect(findClassroomsPlanByIdRepository).toBeDefined();
  });
});
