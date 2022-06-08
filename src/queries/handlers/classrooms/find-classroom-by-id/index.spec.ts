import { FindClassroomByIdRepository } from '@/repositories/classrooms/find-classroom-by-id';
import { Test } from '@nestjs/testing';
import { FindClassroomByIdQueryHandler } from '.';

describe('FindClassroomByIdQueryHandler', () => {
  let findClassroomByIdRepository: FindClassroomByIdRepository;
  let findClassroomByIdQueryHandler: FindClassroomByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindClassroomByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindClassroomByIdQueryHandler
      ]
    }).compile();

    findClassroomByIdRepository = moduleRef.get(FindClassroomByIdRepository);
    findClassroomByIdQueryHandler = moduleRef.get(
      FindClassroomByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findClassroomByIdQueryHandler).toBeDefined();
    expect(findClassroomByIdRepository).toBeDefined();
  });
});
