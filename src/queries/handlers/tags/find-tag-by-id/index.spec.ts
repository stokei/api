import { Test } from '@nestjs/testing';

import { FindTagByIdRepository } from '@/repositories/tags/find-tag-by-id';

import { FindTagByIdQueryHandler } from '.';

describe('FindTagByIdQueryHandler', () => {
  let findTagByIdRepository: FindTagByIdRepository;
  let findTagByIdQueryHandler: FindTagByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindTagByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindTagByIdQueryHandler
      ]
    }).compile();

    findTagByIdRepository = moduleRef.get(FindTagByIdRepository);
    findTagByIdQueryHandler = moduleRef.get(FindTagByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findTagByIdQueryHandler).toBeDefined();
    expect(findTagByIdRepository).toBeDefined();
  });
});
