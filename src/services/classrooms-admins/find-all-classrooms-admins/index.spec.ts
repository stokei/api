import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllClassroomsAdminsService } from '.';

describe('FindAllClassroomsAdminsService', () => {
  let findAllClassroomsAdminsService: FindAllClassroomsAdminsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllClassroomsAdminsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllClassroomsAdminsService = modRef.get(FindAllClassroomsAdminsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllClassroomsAdminsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
