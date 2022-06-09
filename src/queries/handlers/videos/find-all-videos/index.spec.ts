import { Test } from '@nestjs/testing';

import { CountVideosRepository } from '@/repositories/videos/count-videos';
import { FindAllVideosRepository } from '@/repositories/videos/find-all-videos';

import { FindAllVideosQueryHandler } from '.';

describe('FindAllVideosQueryHandler', () => {
  let findAllVideosRepository: FindAllVideosRepository;
  let findAllVideosQueryHandler: FindAllVideosQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllVideosRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountVideosRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllVideosQueryHandler
      ]
    }).compile();

    findAllVideosRepository = moduleRef.get(FindAllVideosRepository);
    findAllVideosQueryHandler = moduleRef.get(FindAllVideosQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllVideosQueryHandler).toBeDefined();
    expect(findAllVideosRepository).toBeDefined();
  });
});
