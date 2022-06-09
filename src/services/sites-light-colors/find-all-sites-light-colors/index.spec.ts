import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllSitesLightColorsService } from '.';

describe('FindAllSitesLightColorsService', () => {
  let findAllSitesLightColorsService: FindAllSitesLightColorsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllSitesLightColorsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllSitesLightColorsService = modRef.get(FindAllSitesLightColorsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllSitesLightColorsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
