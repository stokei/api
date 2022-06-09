import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindCardByIdService } from '.';

describe('FindCardByIdService', () => {
  let findCardByIdService: FindCardByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindCardByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findCardByIdService = modRef.get(FindCardByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findCardByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
