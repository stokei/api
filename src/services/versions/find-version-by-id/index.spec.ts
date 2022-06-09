import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindVersionByIdService } from '.';

describe('FindVersionByIdService', () => {
  let findVersionByIdService: FindVersionByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindVersionByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findVersionByIdService = modRef.get(FindVersionByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findVersionByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
