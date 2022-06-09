import { Test } from '@nestjs/testing';

import { FindClassroomsTagByIdRepository } from '@/repositories/classrooms-tags/find-classrooms-tag-by-id';

import { FindClassroomsTagByIdQueryHandler } from '.';

describe('FindClassroomsTagByIdQueryHandler', () => {
  let findClassroomsTagByIdRepository: FindClassroomsTagByIdRepository;
  let findClassroomsTagByIdQueryHandler: FindClassroomsTagByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindClassroomsTagByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindClassroomsTagByIdQueryHandler
      ]
    }).compile();

    findClassroomsTagByIdRepository = moduleRef.get(
      FindClassroomsTagByIdRepository
    );
    findClassroomsTagByIdQueryHandler = moduleRef.get(
      FindClassroomsTagByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findClassroomsTagByIdQueryHandler).toBeDefined();
    expect(findClassroomsTagByIdRepository).toBeDefined();
  });
});
