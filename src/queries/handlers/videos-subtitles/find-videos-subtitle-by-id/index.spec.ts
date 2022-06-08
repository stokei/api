import { FindVideosSubtitleByIdRepository } from '@/repositories/videos-subtitles/find-videos-subtitle-by-id';
import { Test } from '@nestjs/testing';
import { FindVideosSubtitleByIdQueryHandler } from '.';

describe('FindVideosSubtitleByIdQueryHandler', () => {
  let findVideosSubtitleByIdRepository: FindVideosSubtitleByIdRepository;
  let findVideosSubtitleByIdQueryHandler: FindVideosSubtitleByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindVideosSubtitleByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindVideosSubtitleByIdQueryHandler
      ]
    }).compile();

    findVideosSubtitleByIdRepository = moduleRef.get(
      FindVideosSubtitleByIdRepository
    );
    findVideosSubtitleByIdQueryHandler = moduleRef.get(
      FindVideosSubtitleByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findVideosSubtitleByIdQueryHandler).toBeDefined();
    expect(findVideosSubtitleByIdRepository).toBeDefined();
  });
});
