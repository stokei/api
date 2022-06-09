import { Test } from '@nestjs/testing';

import { CountVideosTagsRepository } from '@/repositories/videos-tags/count-videos-tags';
import { FindAllVideosTagsRepository } from '@/repositories/videos-tags/find-all-videos-tags';

import { FindAllVideosTagsQueryHandler } from '.';

describe('FindAllVideosTagsQueryHandler', () => {
  let findAllVideosTagsRepository: FindAllVideosTagsRepository;
  let findAllVideosTagsQueryHandler: FindAllVideosTagsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllVideosTagsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountVideosTagsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllVideosTagsQueryHandler
      ]
    }).compile();

    findAllVideosTagsRepository = moduleRef.get(FindAllVideosTagsRepository);
    findAllVideosTagsQueryHandler = moduleRef.get(
      FindAllVideosTagsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllVideosTagsQueryHandler).toBeDefined();
    expect(findAllVideosTagsRepository).toBeDefined();
  });
});
