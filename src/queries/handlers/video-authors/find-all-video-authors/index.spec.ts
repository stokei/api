import { Test } from '@nestjs/testing';

import { CountVideoAuthorsRepository } from '@/repositories/video-authors/count-video-authors';
import { FindAllVideoAuthorsRepository } from '@/repositories/video-authors/find-all-video-authors';

import { FindAllVideoAuthorsQueryHandler } from '.';

describe('FindAllVideoAuthorsQueryHandler', () => {
  let findAllVideoAuthorsRepository: FindAllVideoAuthorsRepository;
  let findAllVideoAuthorsQueryHandler: FindAllVideoAuthorsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllVideoAuthorsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountVideoAuthorsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllVideoAuthorsQueryHandler
      ]
    }).compile();

    findAllVideoAuthorsRepository = moduleRef.get(
      FindAllVideoAuthorsRepository
    );
    findAllVideoAuthorsQueryHandler = moduleRef.get(
      FindAllVideoAuthorsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllVideoAuthorsQueryHandler).toBeDefined();
    expect(findAllVideoAuthorsRepository).toBeDefined();
  });
});
