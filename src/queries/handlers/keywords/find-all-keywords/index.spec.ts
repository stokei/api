import { CountKeywordsRepository } from '@/repositories/keywords/count-keywords';
import { FindAllKeywordsRepository } from '@/repositories/keywords/find-all-keywords';
import { Test } from '@nestjs/testing';
import { FindAllKeywordsQueryHandler } from '.';

describe('FindAllKeywordsQueryHandler', () => {
  let findAllKeywordsRepository: FindAllKeywordsRepository;
  let findAllKeywordsQueryHandler: FindAllKeywordsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllKeywordsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountKeywordsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllKeywordsQueryHandler
      ]
    }).compile();

    findAllKeywordsRepository = moduleRef.get(FindAllKeywordsRepository);
    findAllKeywordsQueryHandler = moduleRef.get(FindAllKeywordsQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllKeywordsQueryHandler).toBeDefined();
    expect(findAllKeywordsRepository).toBeDefined();
  });
});
