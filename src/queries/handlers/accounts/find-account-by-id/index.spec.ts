import { FindAccountByIdRepository } from '@/repositories/accounts/find-account-by-id';
import { Test } from '@nestjs/testing';
import { FindAccountByIdQueryHandler } from '.';

describe('FindAccountByIdQueryHandler', () => {
  let findAccountByIdRepository: FindAccountByIdRepository;
  let findAccountByIdQueryHandler: FindAccountByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAccountByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAccountByIdQueryHandler
      ]
    }).compile();

    findAccountByIdRepository = moduleRef.get(FindAccountByIdRepository);
    findAccountByIdQueryHandler = moduleRef.get(FindAccountByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAccountByIdQueryHandler).toBeDefined();
    expect(findAccountByIdRepository).toBeDefined();
  });
});
