import { CountCoursesRepository } from '@/repositories/courses/count-courses';
import { FindAllCoursesRepository } from '@/repositories/courses/find-all-courses';
import { Test } from '@nestjs/testing';
import { FindAllCoursesQueryHandler } from '.';

describe('FindAllCoursesQueryHandler', () => {
  let findAllCoursesRepository: FindAllCoursesRepository;
  let findAllCoursesQueryHandler: FindAllCoursesQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllCoursesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountCoursesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllCoursesQueryHandler
      ]
    }).compile();

    findAllCoursesRepository = moduleRef.get(FindAllCoursesRepository);
    findAllCoursesQueryHandler = moduleRef.get(FindAllCoursesQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllCoursesQueryHandler).toBeDefined();
    expect(findAllCoursesRepository).toBeDefined();
  });
});
