import { Test } from '@nestjs/testing';

import { CountCoursesInstructorsRepository } from '@/repositories/courses-instructors/count-courses-instructors';
import { FindAllCoursesInstructorsRepository } from '@/repositories/courses-instructors/find-all-courses-instructors';

import { FindAllCoursesInstructorsQueryHandler } from '.';

describe('FindAllCoursesInstructorsQueryHandler', () => {
  let findAllCoursesInstructorsRepository: FindAllCoursesInstructorsRepository;
  let findAllCoursesInstructorsQueryHandler: FindAllCoursesInstructorsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllCoursesInstructorsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountCoursesInstructorsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllCoursesInstructorsQueryHandler
      ]
    }).compile();

    findAllCoursesInstructorsRepository = moduleRef.get(
      FindAllCoursesInstructorsRepository
    );
    findAllCoursesInstructorsQueryHandler = moduleRef.get(
      FindAllCoursesInstructorsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllCoursesInstructorsQueryHandler).toBeDefined();
    expect(findAllCoursesInstructorsRepository).toBeDefined();
  });
});
