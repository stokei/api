import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllClassroomModulesService } from '.';

describe('FindAllClassroomModulesService', () => {
  let findAllClassroomModulesService: FindAllClassroomModulesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllClassroomModulesService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllClassroomModulesService = modRef.get(FindAllClassroomModulesService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllClassroomModulesService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
