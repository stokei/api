import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { FindMetatagByIdService } from '.';

describe('FindMetatagByIdService', () => {
  let findMetatagByIdService: FindMetatagByIdService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindMetatagByIdService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findMetatagByIdService = modRef.get(FindMetatagByIdService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findMetatagByIdService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
