import { CountVideosMaterialsRepository } from '@/repositories/videos-materials/count-videos-materials';
import { FindAllVideosMaterialsRepository } from '@/repositories/videos-materials/find-all-videos-materials';
import { Test } from '@nestjs/testing';
import { FindAllVideosMaterialsQueryHandler } from '.';

describe('FindAllVideosMaterialsQueryHandler', () => {
  let findAllVideosMaterialsRepository: FindAllVideosMaterialsRepository;
  let findAllVideosMaterialsQueryHandler: FindAllVideosMaterialsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllVideosMaterialsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountVideosMaterialsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllVideosMaterialsQueryHandler
      ]
    }).compile();

    findAllVideosMaterialsRepository = moduleRef.get(
      FindAllVideosMaterialsRepository
    );
    findAllVideosMaterialsQueryHandler = moduleRef.get(
      FindAllVideosMaterialsQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllVideosMaterialsQueryHandler).toBeDefined();
    expect(findAllVideosMaterialsRepository).toBeDefined();
  });
});
