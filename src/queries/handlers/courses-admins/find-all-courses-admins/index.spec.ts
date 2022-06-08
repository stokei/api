import { CountCoursesAdminsRepository } from '@/repositories/courses-admins/count-courses-admins';
import { FindAllCoursesAdminsRepository } from '@/repositories/courses-admins/find-all-courses-admins';
import { Test } from '@nestjs/testing';
import { FindAllCoursesAdminsQueryHandler } from '.';

describe('FindAllCoursesAdminsQueryHandler', () => {
  let findAllCoursesAdminsRepository: FindAllCoursesAdminsRepository;
  let findAllCoursesAdminsQueryHandler: FindAllCoursesAdminsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllCoursesAdminsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountCoursesAdminsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllCoursesAdminsQueryHandler
      ]
    }).compile();

    findAllCoursesAdminsRepository = moduleRef.get(
      FindAllCoursesAdminsRepository
    );
    findAllCoursesAdminsQueryHandler = moduleRef.get(
      FindAllCoursesAdminsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllCoursesAdminsQueryHandler).toBeDefined();
    expect(findAllCoursesAdminsRepository).toBeDefined();
  });
});
