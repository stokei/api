import { FindCheckoutByIdRepository } from '@/repositories/checkouts/find-checkout-by-id';
import { Test } from '@nestjs/testing';
import { FindCheckoutByIdQueryHandler } from '.';

describe('FindCheckoutByIdQueryHandler', () => {
  let findCheckoutByIdRepository: FindCheckoutByIdRepository;
  let findCheckoutByIdQueryHandler: FindCheckoutByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindCheckoutByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindCheckoutByIdQueryHandler
      ]
    }).compile();

    findCheckoutByIdRepository = moduleRef.get(FindCheckoutByIdRepository);
    findCheckoutByIdQueryHandler = moduleRef.get(FindCheckoutByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findCheckoutByIdQueryHandler).toBeDefined();
    expect(findCheckoutByIdRepository).toBeDefined();
  });
});
