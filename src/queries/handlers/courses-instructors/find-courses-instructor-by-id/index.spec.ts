import { FindCoursesInstructorByIdRepository } from '@/repositories/courses-instructors/find-courses-instructor-by-id';
import { Test } from '@nestjs/testing';
import { FindCoursesInstructorByIdQueryHandler } from '.';

describe('FindCoursesInstructorByIdQueryHandler', () => {
  let findCoursesInstructorByIdRepository: FindCoursesInstructorByIdRepository;
  let findCoursesInstructorByIdQueryHandler: FindCoursesInstructorByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindCoursesInstructorByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindCoursesInstructorByIdQueryHandler
      ]
    }).compile();

    findCoursesInstructorByIdRepository = moduleRef.get(
      FindCoursesInstructorByIdRepository
    );
    findCoursesInstructorByIdQueryHandler = moduleRef.get(
      FindCoursesInstructorByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findCoursesInstructorByIdQueryHandler).toBeDefined();
    expect(findCoursesInstructorByIdRepository).toBeDefined();
  });
});
