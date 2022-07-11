import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindClassroomModuleByIdService } from '.';

describe('FindClassroomModuleByIdService', () => {
  let findClassroomModuleByIdService: FindClassroomModuleByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindClassroomModuleByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findClassroomModuleByIdService = modRef.get(FindClassroomModuleByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findClassroomModuleByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
