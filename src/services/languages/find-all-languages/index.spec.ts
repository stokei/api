import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllLanguagesService } from '.';

describe('FindAllLanguagesService', () => {
  let findAllLanguagesService: FindAllLanguagesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllLanguagesService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllLanguagesService = modRef.get(FindAllLanguagesService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllLanguagesService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
