import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindSitesDarkColorByIdService } from '.';

describe('FindSitesDarkColorByIdService', () => {
  let findSitesDarkColorByIdService: FindSitesDarkColorByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindSitesDarkColorByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findSitesDarkColorByIdService = modRef.get(FindSitesDarkColorByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findSitesDarkColorByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
