import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindImageByIdService } from '.';

describe('FindImageByIdService', () => {
  let findImageByIdService: FindImageByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindImageByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findImageByIdService = modRef.get(FindImageByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findImageByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
