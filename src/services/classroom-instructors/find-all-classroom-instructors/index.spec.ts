import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllClassroomInstructorsService } from '.';

describe('FindAllClassroomInstructorsService', () => {
  let findAllClassroomInstructorsService: FindAllClassroomInstructorsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllClassroomInstructorsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllClassroomInstructorsService = modRef.get(
      FindAllClassroomInstructorsService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllClassroomInstructorsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
