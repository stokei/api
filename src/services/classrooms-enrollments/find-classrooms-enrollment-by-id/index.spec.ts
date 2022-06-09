import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindClassroomsEnrollmentByIdService } from '.';

describe('FindClassroomsEnrollmentByIdService', () => {
  let findClassroomsEnrollmentByIdService: FindClassroomsEnrollmentByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindClassroomsEnrollmentByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findClassroomsEnrollmentByIdService = modRef.get(
      FindClassroomsEnrollmentByIdService
    );
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findClassroomsEnrollmentByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
