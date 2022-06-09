import { Test } from '@nestjs/testing';

import { CountClassroomsRepository } from '@/repositories/classrooms/count-classrooms';
import { FindAllClassroomsRepository } from '@/repositories/classrooms/find-all-classrooms';

import { FindAllClassroomsQueryHandler } from '.';

describe('FindAllClassroomsQueryHandler', () => {
  let findAllClassroomsRepository: FindAllClassroomsRepository;
  let findAllClassroomsQueryHandler: FindAllClassroomsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllClassroomsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountClassroomsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllClassroomsQueryHandler
      ]
    }).compile();

    findAllClassroomsRepository = moduleRef.get(FindAllClassroomsRepository);
    findAllClassroomsQueryHandler = moduleRef.get(
      FindAllClassroomsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllClassroomsQueryHandler).toBeDefined();
    expect(findAllClassroomsRepository).toBeDefined();
  });
});
