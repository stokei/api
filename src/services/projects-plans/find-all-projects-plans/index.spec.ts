import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllProjectsPlansService } from '.';

describe('FindAllProjectsPlansService', () => {
  let findAllProjectsPlansService: FindAllProjectsPlansService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllProjectsPlansService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllProjectsPlansService = modRef.get(FindAllProjectsPlansService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllProjectsPlansService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
