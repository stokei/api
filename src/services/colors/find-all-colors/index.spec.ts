import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllColorsService } from '.';

describe('FindAllColorsService', () => {
  let findAllColorsService: FindAllColorsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllColorsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllColorsService = modRef.get(FindAllColorsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllColorsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
