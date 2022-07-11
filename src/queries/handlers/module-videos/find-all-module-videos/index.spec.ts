import { Test } from '@nestjs/testing';

import { CountModuleVideosRepository } from '@/repositories/module-videos/count-module-videos';
import { FindAllModuleVideosRepository } from '@/repositories/module-videos/find-all-module-videos';

import { FindAllModuleVideosQueryHandler } from '.';

describe('FindAllModuleVideosQueryHandler', () => {
  let findAllModuleVideosRepository: FindAllModuleVideosRepository;
  let findAllModuleVideosQueryHandler: FindAllModuleVideosQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllModuleVideosRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountModuleVideosRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllModuleVideosQueryHandler
      ]
    }).compile();

    findAllModuleVideosRepository = moduleRef.get(
      FindAllModuleVideosRepository
    );
    findAllModuleVideosQueryHandler = moduleRef.get(
      FindAllModuleVideosQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllModuleVideosQueryHandler).toBeDefined();
    expect(findAllModuleVideosRepository).toBeDefined();
  });
});
