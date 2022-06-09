import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllPhonesService } from '.';

describe('FindAllPhonesService', () => {
  let findAllPhonesService: FindAllPhonesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllPhonesService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllPhonesService = modRef.get(FindAllPhonesService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllPhonesService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
