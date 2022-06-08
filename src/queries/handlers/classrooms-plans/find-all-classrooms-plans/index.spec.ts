import { CountClassroomsPlansRepository } from '@/repositories/classrooms-plans/count-classrooms-plans';
import { FindAllClassroomsPlansRepository } from '@/repositories/classrooms-plans/find-all-classrooms-plans';
import { Test } from '@nestjs/testing';
import { FindAllClassroomsPlansQueryHandler } from '.';

describe('FindAllClassroomsPlansQueryHandler', () => {
  let findAllClassroomsPlansRepository: FindAllClassroomsPlansRepository;
  let findAllClassroomsPlansQueryHandler: FindAllClassroomsPlansQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllClassroomsPlansRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountClassroomsPlansRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllClassroomsPlansQueryHandler
      ]
    }).compile();

    findAllClassroomsPlansRepository = moduleRef.get(
      FindAllClassroomsPlansRepository
    );
    findAllClassroomsPlansQueryHandler = moduleRef.get(
      FindAllClassroomsPlansQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllClassroomsPlansQueryHandler).toBeDefined();
    expect(findAllClassroomsPlansRepository).toBeDefined();
  });
});
