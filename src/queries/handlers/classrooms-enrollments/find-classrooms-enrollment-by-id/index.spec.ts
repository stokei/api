import { FindClassroomsEnrollmentByIdRepository } from '@/repositories/classrooms-enrollments/find-classrooms-enrollment-by-id';
import { Test } from '@nestjs/testing';
import { FindClassroomsEnrollmentByIdQueryHandler } from '.';

describe('FindClassroomsEnrollmentByIdQueryHandler', () => {
  let findClassroomsEnrollmentByIdRepository: FindClassroomsEnrollmentByIdRepository;
  let findClassroomsEnrollmentByIdQueryHandler: FindClassroomsEnrollmentByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindClassroomsEnrollmentByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindClassroomsEnrollmentByIdQueryHandler
      ]
    }).compile();

    findClassroomsEnrollmentByIdRepository = moduleRef.get(
      FindClassroomsEnrollmentByIdRepository
    );
    findClassroomsEnrollmentByIdQueryHandler = moduleRef.get(
      FindClassroomsEnrollmentByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findClassroomsEnrollmentByIdQueryHandler).toBeDefined();
    expect(findClassroomsEnrollmentByIdRepository).toBeDefined();
  });
});
