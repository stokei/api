import { Test } from '@nestjs/testing';

import { FindClassroomsMaterialByIdRepository } from '@/repositories/classrooms-materials/find-classrooms-material-by-id';

import { FindClassroomsMaterialByIdQueryHandler } from '.';

describe('FindClassroomsMaterialByIdQueryHandler', () => {
  let findClassroomsMaterialByIdRepository: FindClassroomsMaterialByIdRepository;
  let findClassroomsMaterialByIdQueryHandler: FindClassroomsMaterialByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindClassroomsMaterialByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindClassroomsMaterialByIdQueryHandler
      ]
    }).compile();

    findClassroomsMaterialByIdRepository = moduleRef.get(
      FindClassroomsMaterialByIdRepository
    );
    findClassroomsMaterialByIdQueryHandler = moduleRef.get(
      FindClassroomsMaterialByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findClassroomsMaterialByIdQueryHandler).toBeDefined();
    expect(findClassroomsMaterialByIdRepository).toBeDefined();
  });
});
