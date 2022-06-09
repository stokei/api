import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllClassroomsTagsService } from '.';

describe('FindAllClassroomsTagsService', () => {
  let findAllClassroomsTagsService: FindAllClassroomsTagsService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllClassroomsTagsService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllClassroomsTagsService = modRef.get(FindAllClassroomsTagsService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllClassroomsTagsService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
