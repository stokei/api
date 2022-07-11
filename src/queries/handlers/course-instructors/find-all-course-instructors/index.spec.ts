import { Test } from '@nestjs/testing';

import { CountCourseInstructorsRepository } from '@/repositories/course-instructors/count-course-instructors';
import { FindAllCourseInstructorsRepository } from '@/repositories/course-instructors/find-all-course-instructors';

import { FindAllCourseInstructorsQueryHandler } from '.';

describe('FindAllCourseInstructorsQueryHandler', () => {
  let findAllCourseInstructorsRepository: FindAllCourseInstructorsRepository;
  let findAllCourseInstructorsQueryHandler: FindAllCourseInstructorsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllCourseInstructorsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountCourseInstructorsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllCourseInstructorsQueryHandler
      ]
    }).compile();

    findAllCourseInstructorsRepository = moduleRef.get(
      FindAllCourseInstructorsRepository
    );
    findAllCourseInstructorsQueryHandler = moduleRef.get(
      FindAllCourseInstructorsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllCourseInstructorsQueryHandler).toBeDefined();
    expect(findAllCourseInstructorsRepository).toBeDefined();
  });
});
