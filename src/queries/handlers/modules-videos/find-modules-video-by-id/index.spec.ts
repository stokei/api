import { FindModulesVideoByIdRepository } from '@/repositories/modules-videos/find-modules-video-by-id';
import { Test } from '@nestjs/testing';
import { FindModulesVideoByIdQueryHandler } from '.';

describe('FindModulesVideoByIdQueryHandler', () => {
  let findModulesVideoByIdRepository: FindModulesVideoByIdRepository;
  let findModulesVideoByIdQueryHandler: FindModulesVideoByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindModulesVideoByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindModulesVideoByIdQueryHandler
      ]
    }).compile();

    findModulesVideoByIdRepository = moduleRef.get(
      FindModulesVideoByIdRepository
    );
    findModulesVideoByIdQueryHandler = moduleRef.get(
      FindModulesVideoByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findModulesVideoByIdQueryHandler).toBeDefined();
    expect(findModulesVideoByIdRepository).toBeDefined();
  });
});
