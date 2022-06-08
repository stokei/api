import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindAllPaymentsMethodsService } from '.';

describe('FindAllPaymentsMethodsService', () => {
  let findAllPaymentsMethodsService: FindAllPaymentsMethodsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllPaymentsMethodsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllPaymentsMethodsService = modRef.get(FindAllPaymentsMethodsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllPaymentsMethodsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
