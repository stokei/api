import { CountCheckoutsRepository } from '@/repositories/checkouts/count-checkouts';
import { FindAllCheckoutsRepository } from '@/repositories/checkouts/find-all-checkouts';
import { Test } from '@nestjs/testing';
import { FindAllCheckoutsQueryHandler } from '.';

describe('FindAllCheckoutsQueryHandler', () => {
  let findAllCheckoutsRepository: FindAllCheckoutsRepository;
  let findAllCheckoutsQueryHandler: FindAllCheckoutsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllCheckoutsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountCheckoutsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllCheckoutsQueryHandler
      ]
    }).compile();

    findAllCheckoutsRepository = moduleRef.get(FindAllCheckoutsRepository);
    findAllCheckoutsQueryHandler = moduleRef.get(FindAllCheckoutsQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllCheckoutsQueryHandler).toBeDefined();
    expect(findAllCheckoutsRepository).toBeDefined();
  });
});
