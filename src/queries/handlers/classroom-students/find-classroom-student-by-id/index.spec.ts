import { Test } from '@nestjs/testing';

import { FindClassroomStudentByIdRepository } from '@/repositories/classroom-students/find-classroom-student-by-id';

import { FindClassroomStudentByIdQueryHandler } from '.';

describe('FindClassroomStudentByIdQueryHandler', () => {
  let findClassroomStudentByIdRepository: FindClassroomStudentByIdRepository;
  let findClassroomStudentByIdQueryHandler: FindClassroomStudentByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindClassroomStudentByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindClassroomStudentByIdQueryHandler
      ]
    }).compile();

    findClassroomStudentByIdRepository = moduleRef.get(
      FindClassroomStudentByIdRepository
    );
    findClassroomStudentByIdQueryHandler = moduleRef.get(
      FindClassroomStudentByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findClassroomStudentByIdQueryHandler).toBeDefined();
    expect(findClassroomStudentByIdRepository).toBeDefined();
  });
});
