import { CountAccountsRepository } from '@/repositories/accounts/count-accounts';
import { FindAllAccountsRepository } from '@/repositories/accounts/find-all-accounts';
import { Test } from '@nestjs/testing';
import { FindAllAccountsQueryHandler } from '.';

describe('FindAllAccountsQueryHandler', () => {
  let findAllAccountsRepository: FindAllAccountsRepository;
  let findAllAccountsQueryHandler: FindAllAccountsQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllAccountsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountAccountsRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllAccountsQueryHandler
      ]
    }).compile();

    findAllAccountsRepository = moduleRef.get(FindAllAccountsRepository);
    findAllAccountsQueryHandler = moduleRef.get(FindAllAccountsQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllAccountsQueryHandler).toBeDefined();
    expect(findAllAccountsRepository).toBeDefined();
  });
});
