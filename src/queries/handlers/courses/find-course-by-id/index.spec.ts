import { Test } from '@nestjs/testing';

import { FindCourseByIdRepository } from '@/repositories/courses/find-course-by-id';

import { FindCourseByIdQueryHandler } from '.';

describe('FindCourseByIdQueryHandler', () => {
  let findCourseByIdRepository: FindCourseByIdRepository;
  let findCourseByIdQueryHandler: FindCourseByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindCourseByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindCourseByIdQueryHandler
      ]
    }).compile();

    findCourseByIdRepository = moduleRef.get(FindCourseByIdRepository);
    findCourseByIdQueryHandler = moduleRef.get(FindCourseByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findCourseByIdQueryHandler).toBeDefined();
    expect(findCourseByIdRepository).toBeDefined();
  });
});
