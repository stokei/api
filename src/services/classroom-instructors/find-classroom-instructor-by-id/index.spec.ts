import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindClassroomInstructorByIdService } from '.';

describe('FindClassroomInstructorByIdService', () => {
  let findClassroomInstructorByIdService: FindClassroomInstructorByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindClassroomInstructorByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findClassroomInstructorByIdService = modRef.get(
      FindClassroomInstructorByIdService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findClassroomInstructorByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
