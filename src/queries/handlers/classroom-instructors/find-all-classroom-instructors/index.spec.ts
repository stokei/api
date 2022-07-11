import { Test } from '@nestjs/testing';

import { CountClassroomInstructorsRepository } from '@/repositories/classroom-instructors/count-classroom-instructors';
import { FindAllClassroomInstructorsRepository } from '@/repositories/classroom-instructors/find-all-classroom-instructors';

import { FindAllClassroomInstructorsQueryHandler } from '.';

describe('FindAllClassroomInstructorsQueryHandler', () => {
  let findAllClassroomInstructorsRepository: FindAllClassroomInstructorsRepository;
  let findAllClassroomInstructorsQueryHandler: FindAllClassroomInstructorsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllClassroomInstructorsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountClassroomInstructorsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllClassroomInstructorsQueryHandler
      ]
    }).compile();

    findAllClassroomInstructorsRepository = moduleRef.get(
      FindAllClassroomInstructorsRepository
    );
    findAllClassroomInstructorsQueryHandler = moduleRef.get(
      FindAllClassroomInstructorsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllClassroomInstructorsQueryHandler).toBeDefined();
    expect(findAllClassroomInstructorsRepository).toBeDefined();
  });
});
