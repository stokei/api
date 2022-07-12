import { Test } from '@nestjs/testing';

import { FindVideoAuthorByIdRepository } from '@/repositories/video-authors/find-video-author-by-id';

import { FindVideoAuthorByIdQueryHandler } from '.';

describe('FindVideoAuthorByIdQueryHandler', () => {
  let findVideoAuthorByIdRepository: FindVideoAuthorByIdRepository;
  let findVideoAuthorByIdQueryHandler: FindVideoAuthorByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindVideoAuthorByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindVideoAuthorByIdQueryHandler
      ]
    }).compile();

    findVideoAuthorByIdRepository = moduleRef.get(
      FindVideoAuthorByIdRepository
    );
    findVideoAuthorByIdQueryHandler = moduleRef.get(
      FindVideoAuthorByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findVideoAuthorByIdQueryHandler).toBeDefined();
    expect(findVideoAuthorByIdRepository).toBeDefined();
  });
});
