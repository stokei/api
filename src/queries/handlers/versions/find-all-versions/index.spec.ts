import { CountVersionsRepository } from '@/repositories/versions/count-versions';
import { FindAllVersionsRepository } from '@/repositories/versions/find-all-versions';
import { Test } from '@nestjs/testing';
import { FindAllVersionsQueryHandler } from '.';

describe('FindAllVersionsQueryHandler', () => {
  let findAllVersionsRepository: FindAllVersionsRepository;
  let findAllVersionsQueryHandler: FindAllVersionsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllVersionsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountVersionsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllVersionsQueryHandler
      ]
    }).compile();

    findAllVersionsRepository = moduleRef.get(FindAllVersionsRepository);
    findAllVersionsQueryHandler = moduleRef.get(FindAllVersionsQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllVersionsQueryHandler).toBeDefined();
    expect(findAllVersionsRepository).toBeDefined();
  });
});
