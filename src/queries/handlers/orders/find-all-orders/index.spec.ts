import { CountOrdersRepository } from '@/repositories/orders/count-orders';
import { FindAllOrdersRepository } from '@/repositories/orders/find-all-orders';
import { Test } from '@nestjs/testing';
import { FindAllOrdersQueryHandler } from '.';

describe('FindAllOrdersQueryHandler', () => {
  let findAllOrdersRepository: FindAllOrdersRepository;
  let findAllOrdersQueryHandler: FindAllOrdersQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllOrdersRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountOrdersRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllOrdersQueryHandler
      ]
    }).compile();

    findAllOrdersRepository = moduleRef.get(FindAllOrdersRepository);
    findAllOrdersQueryHandler = moduleRef.get(FindAllOrdersQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllOrdersQueryHandler).toBeDefined();
    expect(findAllOrdersRepository).toBeDefined();
  });
});
