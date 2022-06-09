import { Test } from '@nestjs/testing';

import { FindClassroomsStudentByIdRepository } from '@/repositories/classrooms-students/find-classrooms-student-by-id';

import { FindClassroomsStudentByIdQueryHandler } from '.';

describe('FindClassroomsStudentByIdQueryHandler', () => {
  let findClassroomsStudentByIdRepository: FindClassroomsStudentByIdRepository;
  let findClassroomsStudentByIdQueryHandler: FindClassroomsStudentByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindClassroomsStudentByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindClassroomsStudentByIdQueryHandler
      ]
    }).compile();

    findClassroomsStudentByIdRepository = moduleRef.get(
      FindClassroomsStudentByIdRepository
    );
    findClassroomsStudentByIdQueryHandler = moduleRef.get(
      FindClassroomsStudentByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findClassroomsStudentByIdQueryHandler).toBeDefined();
    expect(findClassroomsStudentByIdRepository).toBeDefined();
  });
});
