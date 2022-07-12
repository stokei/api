import { Test } from '@nestjs/testing';

import { FindClassroomModuleByIdRepository } from '@/repositories/classroom-modules/find-classroom-module-by-id';

import { FindClassroomModuleByIdQueryHandler } from '.';

describe('FindClassroomModuleByIdQueryHandler', () => {
  let findClassroomModuleByIdRepository: FindClassroomModuleByIdRepository;
  let findClassroomModuleByIdQueryHandler: FindClassroomModuleByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindClassroomModuleByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindClassroomModuleByIdQueryHandler
      ]
    }).compile();

    findClassroomModuleByIdRepository = moduleRef.get(
      FindClassroomModuleByIdRepository
    );
    findClassroomModuleByIdQueryHandler = moduleRef.get(
      FindClassroomModuleByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findClassroomModuleByIdQueryHandler).toBeDefined();
    expect(findClassroomModuleByIdRepository).toBeDefined();
  });
});
