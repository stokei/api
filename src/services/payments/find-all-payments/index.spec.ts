import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllPaymentsService } from '.';

describe('FindAllPaymentsService', () => {
  let findAllPaymentsService: FindAllPaymentsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllPaymentsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllPaymentsService = modRef.get(FindAllPaymentsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllPaymentsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
