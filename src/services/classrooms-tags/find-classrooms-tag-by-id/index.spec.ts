import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindClassroomsTagByIdService } from '.';

describe('FindClassroomsTagByIdService', () => {
  let findClassroomsTagByIdService: FindClassroomsTagByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindClassroomsTagByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findClassroomsTagByIdService = modRef.get(FindClassroomsTagByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findClassroomsTagByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
