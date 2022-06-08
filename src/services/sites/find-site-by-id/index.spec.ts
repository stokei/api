import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindSiteByIdService } from '.';

describe('FindSiteByIdService', () => {
  let findSiteByIdService: FindSiteByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindSiteByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findSiteByIdService = modRef.get(FindSiteByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findSiteByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
