import { Test } from '@nestjs/testing';

import { FindModuleVideoByIdRepository } from '@/repositories/module-videos/find-module-video-by-id';

import { FindModuleVideoByIdQueryHandler } from '.';

describe('FindModuleVideoByIdQueryHandler', () => {
  let findModuleVideoByIdRepository: FindModuleVideoByIdRepository;
  let findModuleVideoByIdQueryHandler: FindModuleVideoByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindModuleVideoByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindModuleVideoByIdQueryHandler
      ]
    }).compile();

    findModuleVideoByIdRepository = moduleRef.get(
      FindModuleVideoByIdRepository
    );
    findModuleVideoByIdQueryHandler = moduleRef.get(
      FindModuleVideoByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findModuleVideoByIdQueryHandler).toBeDefined();
    expect(findModuleVideoByIdRepository).toBeDefined();
  });
});
