import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllSitesService } from '.';

describe('FindAllSitesService', () => {
  let findAllSitesService: FindAllSitesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllSitesService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllSitesService = modRef.get(FindAllSitesService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllSitesService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
