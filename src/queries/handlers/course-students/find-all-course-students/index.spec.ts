import { Test } from '@nestjs/testing';

import { CountCourseStudentsRepository } from '@/repositories/course-students/count-course-students';
import { FindAllCourseStudentsRepository } from '@/repositories/course-students/find-all-course-students';

import { FindAllCourseStudentsQueryHandler } from '.';

describe('FindAllCourseStudentsQueryHandler', () => {
  let findAllCourseStudentsRepository: FindAllCourseStudentsRepository;
  let findAllCourseStudentsQueryHandler: FindAllCourseStudentsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllCourseStudentsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountCourseStudentsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllCourseStudentsQueryHandler
      ]
    }).compile();

    findAllCourseStudentsRepository = moduleRef.get(
      FindAllCourseStudentsRepository
    );
    findAllCourseStudentsQueryHandler = moduleRef.get(
      FindAllCourseStudentsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllCourseStudentsQueryHandler).toBeDefined();
    expect(findAllCourseStudentsRepository).toBeDefined();
  });
});
