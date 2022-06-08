import { FindQuestionByIdRepository } from '@/repositories/questions/find-question-by-id';
import { Test } from '@nestjs/testing';
import { FindQuestionByIdQueryHandler } from '.';

describe('FindQuestionByIdQueryHandler', () => {
  let findQuestionByIdRepository: FindQuestionByIdRepository;
  let findQuestionByIdQueryHandler: FindQuestionByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindQuestionByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindQuestionByIdQueryHandler
      ]
    }).compile();

    findQuestionByIdRepository = moduleRef.get(FindQuestionByIdRepository);
    findQuestionByIdQueryHandler = moduleRef.get(FindQuestionByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findQuestionByIdQueryHandler).toBeDefined();
    expect(findQuestionByIdRepository).toBeDefined();
  });
});
