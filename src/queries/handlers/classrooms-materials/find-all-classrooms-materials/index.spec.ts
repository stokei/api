import { CountClassroomsMaterialsRepository } from '@/repositories/classrooms-materials/count-classrooms-materials';
import { FindAllClassroomsMaterialsRepository } from '@/repositories/classrooms-materials/find-all-classrooms-materials';
import { Test } from '@nestjs/testing';
import { FindAllClassroomsMaterialsQueryHandler } from '.';

describe('FindAllClassroomsMaterialsQueryHandler', () => {
  let findAllClassroomsMaterialsRepository: FindAllClassroomsMaterialsRepository;
  let findAllClassroomsMaterialsQueryHandler: FindAllClassroomsMaterialsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllClassroomsMaterialsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountClassroomsMaterialsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllClassroomsMaterialsQueryHandler
      ]
    }).compile();

    findAllClassroomsMaterialsRepository = moduleRef.get(
      FindAllClassroomsMaterialsRepository
    );
    findAllClassroomsMaterialsQueryHandler = moduleRef.get(
      FindAllClassroomsMaterialsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllClassroomsMaterialsQueryHandler).toBeDefined();
    expect(findAllClassroomsMaterialsRepository).toBeDefined();
  });
});
