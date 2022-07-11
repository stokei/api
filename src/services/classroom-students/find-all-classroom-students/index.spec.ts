import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllClassroomStudentsService } from '.';

describe('FindAllClassroomStudentsService', () => {
  let findAllClassroomStudentsService: FindAllClassroomStudentsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllClassroomStudentsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllClassroomStudentsService = modRef.get(
      FindAllClassroomStudentsService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllClassroomStudentsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
