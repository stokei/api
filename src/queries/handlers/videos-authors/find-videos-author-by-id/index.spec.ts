import { FindVideosAuthorByIdRepository } from '@/repositories/videos-authors/find-videos-author-by-id';
import { Test } from '@nestjs/testing';
import { FindVideosAuthorByIdQueryHandler } from '.';

describe('FindVideosAuthorByIdQueryHandler', () => {
  let findVideosAuthorByIdRepository: FindVideosAuthorByIdRepository;
  let findVideosAuthorByIdQueryHandler: FindVideosAuthorByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindVideosAuthorByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindVideosAuthorByIdQueryHandler
      ]
    }).compile();

    findVideosAuthorByIdRepository = moduleRef.get(
      FindVideosAuthorByIdRepository
    );
    findVideosAuthorByIdQueryHandler = moduleRef.get(
      FindVideosAuthorByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findVideosAuthorByIdQueryHandler).toBeDefined();
    expect(findVideosAuthorByIdRepository).toBeDefined();
  });
});
