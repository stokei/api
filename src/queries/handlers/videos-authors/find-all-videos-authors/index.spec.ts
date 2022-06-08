import { CountVideosAuthorsRepository } from '@/repositories/videos-authors/count-videos-authors';
import { FindAllVideosAuthorsRepository } from '@/repositories/videos-authors/find-all-videos-authors';
import { Test } from '@nestjs/testing';
import { FindAllVideosAuthorsQueryHandler } from '.';

describe('FindAllVideosAuthorsQueryHandler', () => {
  let findAllVideosAuthorsRepository: FindAllVideosAuthorsRepository;
  let findAllVideosAuthorsQueryHandler: FindAllVideosAuthorsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllVideosAuthorsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountVideosAuthorsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllVideosAuthorsQueryHandler
      ]
    }).compile();

    findAllVideosAuthorsRepository = moduleRef.get(
      FindAllVideosAuthorsRepository
    );
    findAllVideosAuthorsQueryHandler = moduleRef.get(
      FindAllVideosAuthorsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllVideosAuthorsQueryHandler).toBeDefined();
    expect(findAllVideosAuthorsRepository).toBeDefined();
  });
});
