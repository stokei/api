import { Test } from '@nestjs/testing';

import { FindClassroomInstructorByIdRepository } from '@/repositories/classroom-instructors/find-classroom-instructor-by-id';

import { FindClassroomInstructorByIdQueryHandler } from '.';

describe('FindClassroomInstructorByIdQueryHandler', () => {
  let findClassroomInstructorByIdRepository: FindClassroomInstructorByIdRepository;
  let findClassroomInstructorByIdQueryHandler: FindClassroomInstructorByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindClassroomInstructorByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindClassroomInstructorByIdQueryHandler
      ]
    }).compile();

    findClassroomInstructorByIdRepository = moduleRef.get(
      FindClassroomInstructorByIdRepository
    );
    findClassroomInstructorByIdQueryHandler = moduleRef.get(
      FindClassroomInstructorByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findClassroomInstructorByIdQueryHandler).toBeDefined();
    expect(findClassroomInstructorByIdRepository).toBeDefined();
  });
});
