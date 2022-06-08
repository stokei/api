import { FindCoursesStudentByIdRepository } from '@/repositories/courses-students/find-courses-student-by-id';
import { Test } from '@nestjs/testing';
import { FindCoursesStudentByIdQueryHandler } from '.';

describe('FindCoursesStudentByIdQueryHandler', () => {
  let findCoursesStudentByIdRepository: FindCoursesStudentByIdRepository;
  let findCoursesStudentByIdQueryHandler: FindCoursesStudentByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindCoursesStudentByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindCoursesStudentByIdQueryHandler
      ]
    }).compile();

    findCoursesStudentByIdRepository = moduleRef.get(
      FindCoursesStudentByIdRepository
    );
    findCoursesStudentByIdQueryHandler = moduleRef.get(
      FindCoursesStudentByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findCoursesStudentByIdQueryHandler).toBeDefined();
    expect(findCoursesStudentByIdRepository).toBeDefined();
  });
});
