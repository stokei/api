import { Test } from '@nestjs/testing';

import { FindCourseInstructorByIdRepository } from '@/repositories/course-instructors/find-course-instructor-by-id';

import { FindCourseInstructorByIdQueryHandler } from '.';

describe('FindCourseInstructorByIdQueryHandler', () => {
  let findCourseInstructorByIdRepository: FindCourseInstructorByIdRepository;
  let findCourseInstructorByIdQueryHandler: FindCourseInstructorByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindCourseInstructorByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindCourseInstructorByIdQueryHandler
      ]
    }).compile();

    findCourseInstructorByIdRepository = moduleRef.get(
      FindCourseInstructorByIdRepository
    );
    findCourseInstructorByIdQueryHandler = moduleRef.get(
      FindCourseInstructorByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findCourseInstructorByIdQueryHandler).toBeDefined();
    expect(findCourseInstructorByIdRepository).toBeDefined();
  });
});
