import { CountCartsRepository } from '@/repositories/carts/count-carts';
import { FindAllCartsRepository } from '@/repositories/carts/find-all-carts';
import { Test } from '@nestjs/testing';
import { FindAllCartsQueryHandler } from '.';

describe('FindAllCartsQueryHandler', () => {
  let findAllCartsRepository: FindAllCartsRepository;
  let findAllCartsQueryHandler: FindAllCartsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllCartsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountCartsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllCartsQueryHandler
      ]
    }).compile();

    findAllCartsRepository = moduleRef.get(FindAllCartsRepository);
    findAllCartsQueryHandler = moduleRef.get(FindAllCartsQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllCartsQueryHandler).toBeDefined();
    expect(findAllCartsRepository).toBeDefined();
  });
});
