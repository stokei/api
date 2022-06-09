import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAddressByIdService } from '.';

describe('FindAddressByIdService', () => {
  let findAddressByIdService: FindAddressByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAddressByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAddressByIdService = modRef.get(FindAddressByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAddressByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
