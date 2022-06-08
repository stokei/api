import { FindVideosMaterialByIdRepository } from '@/repositories/videos-materials/find-videos-material-by-id';
import { Test } from '@nestjs/testing';
import { FindVideosMaterialByIdQueryHandler } from '.';

describe('FindVideosMaterialByIdQueryHandler', () => {
  let findVideosMaterialByIdRepository: FindVideosMaterialByIdRepository;
  let findVideosMaterialByIdQueryHandler: FindVideosMaterialByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindVideosMaterialByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindVideosMaterialByIdQueryHandler
      ]
    }).compile();

    findVideosMaterialByIdRepository = moduleRef.get(
      FindVideosMaterialByIdRepository
    );
    findVideosMaterialByIdQueryHandler = moduleRef.get(
      FindVideosMaterialByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findVideosMaterialByIdQueryHandler).toBeDefined();
    expect(findVideosMaterialByIdRepository).toBeDefined();
  });
});
