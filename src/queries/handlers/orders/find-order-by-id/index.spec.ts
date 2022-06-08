import { FindOrderByIdRepository } from '@/repositories/orders/find-order-by-id';
import { Test } from '@nestjs/testing';
import { FindOrderByIdQueryHandler } from '.';

describe('FindOrderByIdQueryHandler', () => {
  let findOrderByIdRepository: FindOrderByIdRepository;
  let findOrderByIdQueryHandler: FindOrderByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindOrderByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindOrderByIdQueryHandler
      ]
    }).compile();

    findOrderByIdRepository = moduleRef.get(FindOrderByIdRepository);
    findOrderByIdQueryHandler = moduleRef.get(FindOrderByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findOrderByIdQueryHandler).toBeDefined();
    expect(findOrderByIdRepository).toBeDefined();
  });
});
