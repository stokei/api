import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllCourseInstructorsService } from '.';

describe('FindAllCourseInstructorsService', () => {
  let findAllCourseInstructorsService: FindAllCourseInstructorsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllCourseInstructorsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllCourseInstructorsService = modRef.get(
      FindAllCourseInstructorsService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllCourseInstructorsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
