import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindProjectsMemberByIdService } from '.';

describe('FindProjectsMemberByIdService', () => {
  let findProjectsMemberByIdService: FindProjectsMemberByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindProjectsMemberByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findProjectsMemberByIdService = modRef.get(FindProjectsMemberByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findProjectsMemberByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
