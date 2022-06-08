import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllAccountsService } from '.';

describe('FindAllAccountsService', () => {
  let findAllAccountsService: FindAllAccountsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllAccountsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllAccountsService = modRef.get(FindAllAccountsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllAccountsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
