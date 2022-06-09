import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindClassroomsStudentByIdService } from '.';

describe('FindClassroomsStudentByIdService', () => {
  let findClassroomsStudentByIdService: FindClassroomsStudentByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindClassroomsStudentByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findClassroomsStudentByIdService = modRef.get(
      FindClassroomsStudentByIdService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findClassroomsStudentByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
