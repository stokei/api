import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindClassroomStudentByIdService } from '.';

describe('FindClassroomStudentByIdService', () => {
  let findClassroomStudentByIdService: FindClassroomStudentByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindClassroomStudentByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findClassroomStudentByIdService = modRef.get(
      FindClassroomStudentByIdService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findClassroomStudentByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
