import { FindClassroomsModuleByIdRepository } from '@/repositories/classrooms-modules/find-classrooms-module-by-id';
import { Test } from '@nestjs/testing';
import { FindClassroomsModuleByIdQueryHandler } from '.';

describe('FindClassroomsModuleByIdQueryHandler', () => {
  let findClassroomsModuleByIdRepository: FindClassroomsModuleByIdRepository;
  let findClassroomsModuleByIdQueryHandler: FindClassroomsModuleByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindClassroomsModuleByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindClassroomsModuleByIdQueryHandler
      ]
    }).compile();

    findClassroomsModuleByIdRepository = moduleRef.get(
      FindClassroomsModuleByIdRepository
    );
    findClassroomsModuleByIdQueryHandler = moduleRef.get(
      FindClassroomsModuleByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findClassroomsModuleByIdQueryHandler).toBeDefined();
    expect(findClassroomsModuleByIdRepository).toBeDefined();
  });
});
