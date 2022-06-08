import { FindLanguageByIdRepository } from '@/repositories/languages/find-language-by-id';
import { Test } from '@nestjs/testing';
import { FindLanguageByIdQueryHandler } from '.';

describe('FindLanguageByIdQueryHandler', () => {
  let findLanguageByIdRepository: FindLanguageByIdRepository;
  let findLanguageByIdQueryHandler: FindLanguageByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindLanguageByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindLanguageByIdQueryHandler
      ]
    }).compile();

    findLanguageByIdRepository = moduleRef.get(FindLanguageByIdRepository);
    findLanguageByIdQueryHandler = moduleRef.get(FindLanguageByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findLanguageByIdQueryHandler).toBeDefined();
    expect(findLanguageByIdRepository).toBeDefined();
  });
});
