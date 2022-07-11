import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindCourseStudentByIdService } from '.';

describe('FindCourseStudentByIdService', () => {
  let findCourseStudentByIdService: FindCourseStudentByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindCourseStudentByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findCourseStudentByIdService = modRef.get(FindCourseStudentByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findCourseStudentByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
