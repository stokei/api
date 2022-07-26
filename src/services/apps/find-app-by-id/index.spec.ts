import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAppByIdService } from '.';

describe('FindAppByIdService', () => {
  let findAppByIdService: FindAppByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAppByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAppByIdService = modRef.get(FindAppByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAppByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
