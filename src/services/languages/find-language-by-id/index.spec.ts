import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindLanguageByIdService } from '.';

describe('FindLanguageByIdService', () => {
  let findLanguageByIdService: FindLanguageByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindLanguageByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findLanguageByIdService = modRef.get(FindLanguageByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findLanguageByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
