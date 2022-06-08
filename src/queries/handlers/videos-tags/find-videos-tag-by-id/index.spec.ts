import { FindVideosTagByIdRepository } from '@/repositories/videos-tags/find-videos-tag-by-id';
import { Test } from '@nestjs/testing';
import { FindVideosTagByIdQueryHandler } from '.';

describe('FindVideosTagByIdQueryHandler', () => {
  let findVideosTagByIdRepository: FindVideosTagByIdRepository;
  let findVideosTagByIdQueryHandler: FindVideosTagByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindVideosTagByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindVideosTagByIdQueryHandler
      ]
    }).compile();

    findVideosTagByIdRepository = moduleRef.get(FindVideosTagByIdRepository);
    findVideosTagByIdQueryHandler = moduleRef.get(
      FindVideosTagByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findVideosTagByIdQueryHandler).toBeDefined();
    expect(findVideosTagByIdRepository).toBeDefined();
  });
});
