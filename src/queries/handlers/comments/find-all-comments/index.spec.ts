import { CountCommentsRepository } from '@/repositories/comments/count-comments';
import { FindAllCommentsRepository } from '@/repositories/comments/find-all-comments';
import { Test } from '@nestjs/testing';
import { FindAllCommentsQueryHandler } from '.';

describe('FindAllCommentsQueryHandler', () => {
  let findAllCommentsRepository: FindAllCommentsRepository;
  let findAllCommentsQueryHandler: FindAllCommentsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllCommentsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountCommentsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllCommentsQueryHandler
      ]
    }).compile();

    findAllCommentsRepository = moduleRef.get(FindAllCommentsRepository);
    findAllCommentsQueryHandler = moduleRef.get(FindAllCommentsQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllCommentsQueryHandler).toBeDefined();
    expect(findAllCommentsRepository).toBeDefined();
  });
});
