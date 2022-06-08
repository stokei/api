import { CountClassroomsEnrollmentsRepository } from '@/repositories/classrooms-enrollments/count-classrooms-enrollments';
import { FindAllClassroomsEnrollmentsRepository } from '@/repositories/classrooms-enrollments/find-all-classrooms-enrollments';
import { Test } from '@nestjs/testing';
import { FindAllClassroomsEnrollmentsQueryHandler } from '.';

describe('FindAllClassroomsEnrollmentsQueryHandler', () => {
  let findAllClassroomsEnrollmentsRepository: FindAllClassroomsEnrollmentsRepository;
  let findAllClassroomsEnrollmentsQueryHandler: FindAllClassroomsEnrollmentsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllClassroomsEnrollmentsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountClassroomsEnrollmentsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllClassroomsEnrollmentsQueryHandler
      ]
    }).compile();

    findAllClassroomsEnrollmentsRepository = moduleRef.get(
      FindAllClassroomsEnrollmentsRepository
    );
    findAllClassroomsEnrollmentsQueryHandler = moduleRef.get(
      FindAllClassroomsEnrollmentsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllClassroomsEnrollmentsQueryHandler).toBeDefined();
    expect(findAllClassroomsEnrollmentsRepository).toBeDefined();
  });
});
