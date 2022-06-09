import { Test } from '@nestjs/testing';

import { FindVideoByIdRepository } from '@/repositories/videos/find-video-by-id';

import { FindVideoByIdQueryHandler } from '.';

describe('FindVideoByIdQueryHandler', () => {
  let findVideoByIdRepository: FindVideoByIdRepository;
  let findVideoByIdQueryHandler: FindVideoByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindVideoByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindVideoByIdQueryHandler
      ]
    }).compile();

    findVideoByIdRepository = moduleRef.get(FindVideoByIdRepository);
    findVideoByIdQueryHandler = moduleRef.get(FindVideoByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findVideoByIdQueryHandler).toBeDefined();
    expect(findVideoByIdRepository).toBeDefined();
  });
});
