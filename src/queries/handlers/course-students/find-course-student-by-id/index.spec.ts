import { Test } from '@nestjs/testing';

import { FindCourseStudentByIdRepository } from '@/repositories/course-students/find-course-student-by-id';

import { FindCourseStudentByIdQueryHandler } from '.';

describe('FindCourseStudentByIdQueryHandler', () => {
  let findCourseStudentByIdRepository: FindCourseStudentByIdRepository;
  let findCourseStudentByIdQueryHandler: FindCourseStudentByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindCourseStudentByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindCourseStudentByIdQueryHandler
      ]
    }).compile();

    findCourseStudentByIdRepository = moduleRef.get(
      FindCourseStudentByIdRepository
    );
    findCourseStudentByIdQueryHandler = moduleRef.get(
      FindCourseStudentByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findCourseStudentByIdQueryHandler).toBeDefined();
    expect(findCourseStudentByIdRepository).toBeDefined();
  });
});
