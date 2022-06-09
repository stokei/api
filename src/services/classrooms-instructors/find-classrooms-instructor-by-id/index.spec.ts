import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindClassroomsInstructorByIdService } from '.';

describe('FindClassroomsInstructorByIdService', () => {
  let findClassroomsInstructorByIdService: FindClassroomsInstructorByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindClassroomsInstructorByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findClassroomsInstructorByIdService = modRef.get(
      FindClassroomsInstructorByIdService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findClassroomsInstructorByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
