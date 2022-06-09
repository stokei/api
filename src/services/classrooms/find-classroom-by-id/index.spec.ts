import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindClassroomByIdService } from '.';

describe('FindClassroomByIdService', () => {
  let findClassroomByIdService: FindClassroomByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindClassroomByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findClassroomByIdService = modRef.get(FindClassroomByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findClassroomByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
