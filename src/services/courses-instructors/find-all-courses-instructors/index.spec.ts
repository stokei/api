import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllCoursesInstructorsService } from '.';

describe('FindAllCoursesInstructorsService', () => {
  let findAllCoursesInstructorsService: FindAllCoursesInstructorsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllCoursesInstructorsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllCoursesInstructorsService = modRef.get(
      FindAllCoursesInstructorsService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllCoursesInstructorsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
