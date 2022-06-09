import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllCoursesStudentsService } from '.';

describe('FindAllCoursesStudentsService', () => {
  let findAllCoursesStudentsService: FindAllCoursesStudentsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllCoursesStudentsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllCoursesStudentsService = modRef.get(FindAllCoursesStudentsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllCoursesStudentsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
