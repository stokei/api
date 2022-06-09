import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllSitesDarkColorsService } from '.';

describe('FindAllSitesDarkColorsService', () => {
  let findAllSitesDarkColorsService: FindAllSitesDarkColorsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllSitesDarkColorsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllSitesDarkColorsService = modRef.get(FindAllSitesDarkColorsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllSitesDarkColorsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
