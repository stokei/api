import { Test } from '@nestjs/testing';

import { FindCommentByIdRepository } from '@/repositories/comments/find-comment-by-id';

import { FindCommentByIdQueryHandler } from '.';

describe('FindCommentByIdQueryHandler', () => {
  let findCommentByIdRepository: FindCommentByIdRepository;
  let findCommentByIdQueryHandler: FindCommentByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindCommentByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindCommentByIdQueryHandler
      ]
    }).compile();

    findCommentByIdRepository = moduleRef.get(FindCommentByIdRepository);
    findCommentByIdQueryHandler = moduleRef.get(FindCommentByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findCommentByIdQueryHandler).toBeDefined();
    expect(findCommentByIdRepository).toBeDefined();
  });
});
