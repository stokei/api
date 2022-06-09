import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindClassroomsAdminByIdService } from '.';

describe('FindClassroomsAdminByIdService', () => {
  let findClassroomsAdminByIdService: FindClassroomsAdminByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindClassroomsAdminByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findClassroomsAdminByIdService = modRef.get(FindClassroomsAdminByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findClassroomsAdminByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
