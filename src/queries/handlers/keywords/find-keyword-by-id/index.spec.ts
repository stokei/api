import { Test } from '@nestjs/testing';

import { FindKeywordByIdRepository } from '@/repositories/keywords/find-keyword-by-id';

import { FindKeywordByIdQueryHandler } from '.';

describe('FindKeywordByIdQueryHandler', () => {
  let findKeywordByIdRepository: FindKeywordByIdRepository;
  let findKeywordByIdQueryHandler: FindKeywordByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindKeywordByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindKeywordByIdQueryHandler
      ]
    }).compile();

    findKeywordByIdRepository = moduleRef.get(FindKeywordByIdRepository);
    findKeywordByIdQueryHandler = moduleRef.get(FindKeywordByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findKeywordByIdQueryHandler).toBeDefined();
    expect(findKeywordByIdRepository).toBeDefined();
  });
});
