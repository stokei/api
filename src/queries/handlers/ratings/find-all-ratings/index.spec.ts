import { CountRatingsRepository } from '@/repositories/ratings/count-ratings';
import { FindAllRatingsRepository } from '@/repositories/ratings/find-all-ratings';
import { Test } from '@nestjs/testing';
import { FindAllRatingsQueryHandler } from '.';

describe('FindAllRatingsQueryHandler', () => {
  let findAllRatingsRepository: FindAllRatingsRepository;
  let findAllRatingsQueryHandler: FindAllRatingsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllRatingsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountRatingsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllRatingsQueryHandler
      ]
    }).compile();

    findAllRatingsRepository = moduleRef.get(FindAllRatingsRepository);
    findAllRatingsQueryHandler = moduleRef.get(FindAllRatingsQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllRatingsQueryHandler).toBeDefined();
    expect(findAllRatingsRepository).toBeDefined();
  });
});
