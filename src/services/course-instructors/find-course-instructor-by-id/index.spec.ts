import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindCourseInstructorByIdService } from '.';

describe('FindCourseInstructorByIdService', () => {
  let findCourseInstructorByIdService: FindCourseInstructorByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindCourseInstructorByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findCourseInstructorByIdService = modRef.get(
      FindCourseInstructorByIdService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findCourseInstructorByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
