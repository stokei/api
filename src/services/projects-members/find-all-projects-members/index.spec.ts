import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllProjectsMembersService } from '.';

describe('FindAllProjectsMembersService', () => {
  let findAllProjectsMembersService: FindAllProjectsMembersService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllProjectsMembersService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllProjectsMembersService = modRef.get(FindAllProjectsMembersService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllProjectsMembersService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
