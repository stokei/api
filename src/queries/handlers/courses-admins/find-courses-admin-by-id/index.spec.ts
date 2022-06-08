import { FindCoursesAdminByIdRepository } from '@/repositories/courses-admins/find-courses-admin-by-id';
import { Test } from '@nestjs/testing';
import { FindCoursesAdminByIdQueryHandler } from '.';

describe('FindCoursesAdminByIdQueryHandler', () => {
  let findCoursesAdminByIdRepository: FindCoursesAdminByIdRepository;
  let findCoursesAdminByIdQueryHandler: FindCoursesAdminByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindCoursesAdminByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindCoursesAdminByIdQueryHandler
      ]
    }).compile();

    findCoursesAdminByIdRepository = moduleRef.get(
      FindCoursesAdminByIdRepository
    );
    findCoursesAdminByIdQueryHandler = moduleRef.get(
      FindCoursesAdminByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findCoursesAdminByIdQueryHandler).toBeDefined();
    expect(findCoursesAdminByIdRepository).toBeDefined();
  });
});
