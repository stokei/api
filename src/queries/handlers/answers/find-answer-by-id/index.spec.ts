import { FindAnswerByIdRepository } from '@/repositories/answers/find-answer-by-id';
import { Test } from '@nestjs/testing';
import { FindAnswerByIdQueryHandler } from '.';

describe('FindAnswerByIdQueryHandler', () => {
  let findAnswerByIdRepository: FindAnswerByIdRepository;
  let findAnswerByIdQueryHandler: FindAnswerByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAnswerByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAnswerByIdQueryHandler
      ]
    }).compile();

    findAnswerByIdRepository = moduleRef.get(FindAnswerByIdRepository);
    findAnswerByIdQueryHandler = moduleRef.get(FindAnswerByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAnswerByIdQueryHandler).toBeDefined();
    expect(findAnswerByIdRepository).toBeDefined();
  });
});
