import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindCoursesInstructorByIdService } from '.';

describe('FindCoursesInstructorByIdService', () => {
  let findCoursesInstructorByIdService: FindCoursesInstructorByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindCoursesInstructorByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findCoursesInstructorByIdService = modRef.get(
      FindCoursesInstructorByIdService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findCoursesInstructorByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
