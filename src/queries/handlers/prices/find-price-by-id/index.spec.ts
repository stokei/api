import { FindPriceByIdRepository } from '@/repositories/prices/find-price-by-id';
import { Test } from '@nestjs/testing';
import { FindPriceByIdQueryHandler } from '.';

describe('FindPriceByIdQueryHandler', () => {
  let findPriceByIdRepository: FindPriceByIdRepository;
  let findPriceByIdQueryHandler: FindPriceByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindPriceByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindPriceByIdQueryHandler
      ]
    }).compile();

    findPriceByIdRepository = moduleRef.get(FindPriceByIdRepository);
    findPriceByIdQueryHandler = moduleRef.get(FindPriceByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findPriceByIdQueryHandler).toBeDefined();
    expect(findPriceByIdRepository).toBeDefined();
  });
});
