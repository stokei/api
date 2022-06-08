import { CountClassroomsInstructorsRepository } from '@/repositories/classrooms-instructors/count-classrooms-instructors';
import { FindAllClassroomsInstructorsRepository } from '@/repositories/classrooms-instructors/find-all-classrooms-instructors';
import { Test } from '@nestjs/testing';
import { FindAllClassroomsInstructorsQueryHandler } from '.';

describe('FindAllClassroomsInstructorsQueryHandler', () => {
  let findAllClassroomsInstructorsRepository: FindAllClassroomsInstructorsRepository;
  let findAllClassroomsInstructorsQueryHandler: FindAllClassroomsInstructorsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllClassroomsInstructorsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountClassroomsInstructorsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllClassroomsInstructorsQueryHandler
      ]
    }).compile();

    findAllClassroomsInstructorsRepository = moduleRef.get(
      FindAllClassroomsInstructorsRepository
    );
    findAllClassroomsInstructorsQueryHandler = moduleRef.get(
      FindAllClassroomsInstructorsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllClassroomsInstructorsQueryHandler).toBeDefined();
    expect(findAllClassroomsInstructorsRepository).toBeDefined();
  });
});
