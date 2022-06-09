import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindCoursesStudentByIdService } from '.';

describe('FindCoursesStudentByIdService', () => {
  let findCoursesStudentByIdService: FindCoursesStudentByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindCoursesStudentByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findCoursesStudentByIdService = modRef.get(FindCoursesStudentByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findCoursesStudentByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
