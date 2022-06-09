import { Test } from '@nestjs/testing';

import { CountQuestionsRepository } from '@/repositories/questions/count-questions';
import { FindAllQuestionsRepository } from '@/repositories/questions/find-all-questions';

import { FindAllQuestionsQueryHandler } from '.';

describe('FindAllQuestionsQueryHandler', () => {
  let findAllQuestionsRepository: FindAllQuestionsRepository;
  let findAllQuestionsQueryHandler: FindAllQuestionsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllQuestionsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountQuestionsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllQuestionsQueryHandler
      ]
    }).compile();

    findAllQuestionsRepository = moduleRef.get(FindAllQuestionsRepository);
    findAllQuestionsQueryHandler = moduleRef.get(FindAllQuestionsQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllQuestionsQueryHandler).toBeDefined();
    expect(findAllQuestionsRepository).toBeDefined();
  });
});
