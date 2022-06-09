import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindPageByIdService } from '.';

describe('FindPageByIdService', () => {
  let findPageByIdService: FindPageByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindPageByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findPageByIdService = modRef.get(FindPageByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findPageByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
