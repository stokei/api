import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllCourseStudentsService } from '.';

describe('FindAllCourseStudentsService', () => {
  let findAllCourseStudentsService: FindAllCourseStudentsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllCourseStudentsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllCourseStudentsService = modRef.get(FindAllCourseStudentsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllCourseStudentsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
