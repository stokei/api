import { Test } from '@nestjs/testing';

import { CountImagesRepository } from '@/repositories/images/count-images';
import { FindAllImagesRepository } from '@/repositories/images/find-all-images';

import { FindAllImagesQueryHandler } from '.';

describe('FindAllImagesQueryHandler', () => {
  let findAllImagesRepository: FindAllImagesRepository;
  let findAllImagesQueryHandler: FindAllImagesQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllImagesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountImagesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllImagesQueryHandler
      ]
    }).compile();

    findAllImagesRepository = moduleRef.get(FindAllImagesRepository);
    findAllImagesQueryHandler = moduleRef.get(FindAllImagesQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllImagesQueryHandler).toBeDefined();
    expect(findAllImagesRepository).toBeDefined();
  });
});
