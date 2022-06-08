import { CountVideosSubtitlesRepository } from '@/repositories/videos-subtitles/count-videos-subtitles';
import { FindAllVideosSubtitlesRepository } from '@/repositories/videos-subtitles/find-all-videos-subtitles';
import { Test } from '@nestjs/testing';
import { FindAllVideosSubtitlesQueryHandler } from '.';

describe('FindAllVideosSubtitlesQueryHandler', () => {
  let findAllVideosSubtitlesRepository: FindAllVideosSubtitlesRepository;
  let findAllVideosSubtitlesQueryHandler: FindAllVideosSubtitlesQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllVideosSubtitlesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountVideosSubtitlesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllVideosSubtitlesQueryHandler
      ]
    }).compile();

    findAllVideosSubtitlesRepository = moduleRef.get(
      FindAllVideosSubtitlesRepository
    );
    findAllVideosSubtitlesQueryHandler = moduleRef.get(
      FindAllVideosSubtitlesQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllVideosSubtitlesQueryHandler).toBeDefined();
    expect(findAllVideosSubtitlesRepository).toBeDefined();
  });
});
