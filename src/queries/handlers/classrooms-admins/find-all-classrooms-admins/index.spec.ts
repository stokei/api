import { CountClassroomsAdminsRepository } from '@/repositories/classrooms-admins/count-classrooms-admins';
import { FindAllClassroomsAdminsRepository } from '@/repositories/classrooms-admins/find-all-classrooms-admins';
import { Test } from '@nestjs/testing';
import { FindAllClassroomsAdminsQueryHandler } from '.';

describe('FindAllClassroomsAdminsQueryHandler', () => {
  let findAllClassroomsAdminsRepository: FindAllClassroomsAdminsRepository;
  let findAllClassroomsAdminsQueryHandler: FindAllClassroomsAdminsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllClassroomsAdminsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountClassroomsAdminsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllClassroomsAdminsQueryHandler
      ]
    }).compile();

    findAllClassroomsAdminsRepository = moduleRef.get(
      FindAllClassroomsAdminsRepository
    );
    findAllClassroomsAdminsQueryHandler = moduleRef.get(
      FindAllClassroomsAdminsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllClassroomsAdminsQueryHandler).toBeDefined();
    expect(findAllClassroomsAdminsRepository).toBeDefined();
  });
});
