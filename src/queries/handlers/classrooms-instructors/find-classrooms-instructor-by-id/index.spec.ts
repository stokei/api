import { FindClassroomsInstructorByIdRepository } from '@/repositories/classrooms-instructors/find-classrooms-instructor-by-id';
import { Test } from '@nestjs/testing';
import { FindClassroomsInstructorByIdQueryHandler } from '.';

describe('FindClassroomsInstructorByIdQueryHandler', () => {
  let findClassroomsInstructorByIdRepository: FindClassroomsInstructorByIdRepository;
  let findClassroomsInstructorByIdQueryHandler: FindClassroomsInstructorByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindClassroomsInstructorByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindClassroomsInstructorByIdQueryHandler
      ]
    }).compile();

    findClassroomsInstructorByIdRepository = moduleRef.get(
      FindClassroomsInstructorByIdRepository
    );
    findClassroomsInstructorByIdQueryHandler = moduleRef.get(
      FindClassroomsInstructorByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findClassroomsInstructorByIdQueryHandler).toBeDefined();
    expect(findClassroomsInstructorByIdRepository).toBeDefined();
  });
});
