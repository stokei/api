import { Test } from '@nestjs/testing';

import { CountClassroomStudentsRepository } from '@/repositories/classroom-students/count-classroom-students';
import { FindAllClassroomStudentsRepository } from '@/repositories/classroom-students/find-all-classroom-students';

import { FindAllClassroomStudentsQueryHandler } from '.';

describe('FindAllClassroomStudentsQueryHandler', () => {
  let findAllClassroomStudentsRepository: FindAllClassroomStudentsRepository;
  let findAllClassroomStudentsQueryHandler: FindAllClassroomStudentsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllClassroomStudentsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountClassroomStudentsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllClassroomStudentsQueryHandler
      ]
    }).compile();

    findAllClassroomStudentsRepository = moduleRef.get(
      FindAllClassroomStudentsRepository
    );
    findAllClassroomStudentsQueryHandler = moduleRef.get(
      FindAllClassroomStudentsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllClassroomStudentsQueryHandler).toBeDefined();
    expect(findAllClassroomStudentsRepository).toBeDefined();
  });
});
