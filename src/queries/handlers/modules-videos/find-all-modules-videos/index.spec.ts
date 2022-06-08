import { CountModulesVideosRepository } from '@/repositories/modules-videos/count-modules-videos';
import { FindAllModulesVideosRepository } from '@/repositories/modules-videos/find-all-modules-videos';
import { Test } from '@nestjs/testing';
import { FindAllModulesVideosQueryHandler } from '.';

describe('FindAllModulesVideosQueryHandler', () => {
  let findAllModulesVideosRepository: FindAllModulesVideosRepository;
  let findAllModulesVideosQueryHandler: FindAllModulesVideosQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllModulesVideosRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountModulesVideosRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllModulesVideosQueryHandler
      ]
    }).compile();

    findAllModulesVideosRepository = moduleRef.get(
      FindAllModulesVideosRepository
    );
    findAllModulesVideosQueryHandler = moduleRef.get(
      FindAllModulesVideosQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllModulesVideosQueryHandler).toBeDefined();
    expect(findAllModulesVideosRepository).toBeDefined();
  });
});
