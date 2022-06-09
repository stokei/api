import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindColorByIdService } from '.';

describe('FindColorByIdService', () => {
  let findColorByIdService: FindColorByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindColorByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findColorByIdService = modRef.get(FindColorByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findColorByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
