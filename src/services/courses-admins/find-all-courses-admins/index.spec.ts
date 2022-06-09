import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllCoursesAdminsService } from '.';

describe('FindAllCoursesAdminsService', () => {
  let findAllCoursesAdminsService: FindAllCoursesAdminsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllCoursesAdminsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllCoursesAdminsService = modRef.get(FindAllCoursesAdminsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllCoursesAdminsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
