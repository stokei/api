import { Test } from '@nestjs/testing';

import { CountTagsRepository } from '@/repositories/tags/count-tags';
import { FindAllTagsRepository } from '@/repositories/tags/find-all-tags';

import { FindAllTagsQueryHandler } from '.';

describe('FindAllTagsQueryHandler', () => {
  let findAllTagsRepository: FindAllTagsRepository;
  let findAllTagsQueryHandler: FindAllTagsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllTagsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountTagsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllTagsQueryHandler
      ]
    }).compile();

    findAllTagsRepository = moduleRef.get(FindAllTagsRepository);
    findAllTagsQueryHandler = moduleRef.get(FindAllTagsQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllTagsQueryHandler).toBeDefined();
    expect(findAllTagsRepository).toBeDefined();
  });
});
