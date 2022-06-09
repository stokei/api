import { Test } from '@nestjs/testing';

import { CountAnswersRepository } from '@/repositories/answers/count-answers';
import { FindAllAnswersRepository } from '@/repositories/answers/find-all-answers';

import { FindAllAnswersQueryHandler } from '.';

describe('FindAllAnswersQueryHandler', () => {
  let findAllAnswersRepository: FindAllAnswersRepository;
  let findAllAnswersQueryHandler: FindAllAnswersQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllAnswersRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountAnswersRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllAnswersQueryHandler
      ]
    }).compile();

    findAllAnswersRepository = moduleRef.get(FindAllAnswersRepository);
    findAllAnswersQueryHandler = moduleRef.get(FindAllAnswersQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllAnswersQueryHandler).toBeDefined();
    expect(findAllAnswersRepository).toBeDefined();
  });
});
