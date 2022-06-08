import { FindCartsItemByIdRepository } from '@/repositories/carts-items/find-carts-item-by-id';
import { Test } from '@nestjs/testing';
import { FindCartsItemByIdQueryHandler } from '.';

describe('FindCartsItemByIdQueryHandler', () => {
  let findCartsItemByIdRepository: FindCartsItemByIdRepository;
  let findCartsItemByIdQueryHandler: FindCartsItemByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindCartsItemByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindCartsItemByIdQueryHandler
      ]
    }).compile();

    findCartsItemByIdRepository = moduleRef.get(FindCartsItemByIdRepository);
    findCartsItemByIdQueryHandler = moduleRef.get(
      FindCartsItemByIdQueryHandler
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findCartsItemByIdQueryHandler).toBeDefined();
    expect(findCartsItemByIdRepository).toBeDefined();
  });
});
