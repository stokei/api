import { Test } from '@nestjs/testing';

import { CountCoursesStudentsRepository } from '@/repositories/courses-students/count-courses-students';
import { FindAllCoursesStudentsRepository } from '@/repositories/courses-students/find-all-courses-students';

import { FindAllCoursesStudentsQueryHandler } from '.';

describe('FindAllCoursesStudentsQueryHandler', () => {
  let findAllCoursesStudentsRepository: FindAllCoursesStudentsRepository;
  let findAllCoursesStudentsQueryHandler: FindAllCoursesStudentsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllCoursesStudentsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountCoursesStudentsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllCoursesStudentsQueryHandler
      ]
    }).compile();

    findAllCoursesStudentsRepository = moduleRef.get(
      FindAllCoursesStudentsRepository
    );
    findAllCoursesStudentsQueryHandler = moduleRef.get(
      FindAllCoursesStudentsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllCoursesStudentsQueryHandler).toBeDefined();
    expect(findAllCoursesStudentsRepository).toBeDefined();
  });
});
