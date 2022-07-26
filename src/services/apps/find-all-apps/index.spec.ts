import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllAppsService } from '.';

describe('FindAllAppsService', () => {
  let findAllAppsService: FindAllAppsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllAppsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllAppsService = modRef.get(FindAllAppsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllAppsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
