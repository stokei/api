import { Test } from '@nestjs/testing';

import { FindRatingByIdRepository } from '@/repositories/ratings/find-rating-by-id';

import { FindRatingByIdQueryHandler } from '.';

describe('FindRatingByIdQueryHandler', () => {
  let findRatingByIdRepository: FindRatingByIdRepository;
  let findRatingByIdQueryHandler: FindRatingByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindRatingByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindRatingByIdQueryHandler
      ]
    }).compile();

    findRatingByIdRepository = moduleRef.get(FindRatingByIdRepository);
    findRatingByIdQueryHandler = moduleRef.get(FindRatingByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findRatingByIdQueryHandler).toBeDefined();
    expect(findRatingByIdRepository).toBeDefined();
  });
});
