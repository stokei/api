import { Test } from '@nestjs/testing';

import { CountCardsRepository } from '@/repositories/cards/count-cards';
import { FindAllCardsRepository } from '@/repositories/cards/find-all-cards';

import { FindAllCardsQueryHandler } from '.';

describe('FindAllCardsQueryHandler', () => {
  let findAllCardsRepository: FindAllCardsRepository;
  let findAllCardsQueryHandler: FindAllCardsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllCardsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountCardsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllCardsQueryHandler
      ]
    }).compile();

    findAllCardsRepository = moduleRef.get(FindAllCardsRepository);
    findAllCardsQueryHandler = moduleRef.get(FindAllCardsQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllCardsQueryHandler).toBeDefined();
    expect(findAllCardsRepository).toBeDefined();
  });
});
