import { Test } from '@nestjs/testing';

import { CountClassroomsTagsRepository } from '@/repositories/classrooms-tags/count-classrooms-tags';
import { FindAllClassroomsTagsRepository } from '@/repositories/classrooms-tags/find-all-classrooms-tags';

import { FindAllClassroomsTagsQueryHandler } from '.';

describe('FindAllClassroomsTagsQueryHandler', () => {
  let findAllClassroomsTagsRepository: FindAllClassroomsTagsRepository;
  let findAllClassroomsTagsQueryHandler: FindAllClassroomsTagsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllClassroomsTagsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountClassroomsTagsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllClassroomsTagsQueryHandler
      ]
    }).compile();

    findAllClassroomsTagsRepository = moduleRef.get(
      FindAllClassroomsTagsRepository
    );
    findAllClassroomsTagsQueryHandler = moduleRef.get(
      FindAllClassroomsTagsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllClassroomsTagsQueryHandler).toBeDefined();
    expect(findAllClassroomsTagsRepository).toBeDefined();
  });
});
