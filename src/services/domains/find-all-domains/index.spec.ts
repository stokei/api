import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllDomainsService } from '.';

describe('FindAllDomainsService', () => {
  let findAllDomainsService: FindAllDomainsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllDomainsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllDomainsService = modRef.get(FindAllDomainsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllDomainsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
