import { FindClassroomsAdminByIdRepository } from '@/repositories/classrooms-admins/find-classrooms-admin-by-id';
import { Test } from '@nestjs/testing';
import { FindClassroomsAdminByIdQueryHandler } from '.';

describe('FindClassroomsAdminByIdQueryHandler', () => {
  let findClassroomsAdminByIdRepository: FindClassroomsAdminByIdRepository;
  let findClassroomsAdminByIdQueryHandler: FindClassroomsAdminByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindClassroomsAdminByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindClassroomsAdminByIdQueryHandler
      ]
    }).compile();

    findClassroomsAdminByIdRepository = moduleRef.get(
      FindClassroomsAdminByIdRepository
    );
    findClassroomsAdminByIdQueryHandler = moduleRef.get(
      FindClassroomsAdminByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findClassroomsAdminByIdQueryHandler).toBeDefined();
    expect(findClassroomsAdminByIdRepository).toBeDefined();
  });
});
