import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindSitesLightColorByIdService } from '.';

describe('FindSitesLightColorByIdService', () => {
  let findSitesLightColorByIdService: FindSitesLightColorByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindSitesLightColorByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findSitesLightColorByIdService = modRef.get(FindSitesLightColorByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findSitesLightColorByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
