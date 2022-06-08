import { CountOrdersSellersRepository } from '@/repositories/orders-sellers/count-orders-sellers';
import { FindAllOrdersSellersRepository } from '@/repositories/orders-sellers/find-all-orders-sellers';
import { Test } from '@nestjs/testing';
import { FindAllOrdersSellersQueryHandler } from '.';

describe('FindAllOrdersSellersQueryHandler', () => {
  let findAllOrdersSellersRepository: FindAllOrdersSellersRepository;
  let findAllOrdersSellersQueryHandler: FindAllOrdersSellersQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllOrdersSellersRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountOrdersSellersRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllOrdersSellersQueryHandler
      ]
    }).compile();

    findAllOrdersSellersRepository = moduleRef.get(
      FindAllOrdersSellersRepository
    );
    findAllOrdersSellersQueryHandler = moduleRef.get(
      FindAllOrdersSellersQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllOrdersSellersQueryHandler).toBeDefined();
    expect(findAllOrdersSellersRepository).toBeDefined();
  });
});
