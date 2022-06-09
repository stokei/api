import { Test } from '@nestjs/testing';

import { CountClassroomsStudentsRepository } from '@/repositories/classrooms-students/count-classrooms-students';
import { FindAllClassroomsStudentsRepository } from '@/repositories/classrooms-students/find-all-classrooms-students';

import { FindAllClassroomsStudentsQueryHandler } from '.';

describe('FindAllClassroomsStudentsQueryHandler', () => {
  let findAllClassroomsStudentsRepository: FindAllClassroomsStudentsRepository;
  let findAllClassroomsStudentsQueryHandler: FindAllClassroomsStudentsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllClassroomsStudentsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountClassroomsStudentsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllClassroomsStudentsQueryHandler
      ]
    }).compile();

    findAllClassroomsStudentsRepository = moduleRef.get(
      FindAllClassroomsStudentsRepository
    );
    findAllClassroomsStudentsQueryHandler = moduleRef.get(
      FindAllClassroomsStudentsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllClassroomsStudentsQueryHandler).toBeDefined();
    expect(findAllClassroomsStudentsRepository).toBeDefined();
  });
});
