import { QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { FindAllImagesService } from '.';

describe('FindAllImagesService', () => {
  let findAllImagesService: FindAllImagesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        FindAllImagesService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    findAllImagesService = modRef.get(FindAllImagesService);
    queryBus = modRef.get(QueryBus);
  });

  it('should be defined', () => {
    expect(findAllImagesService).toBeDefined();
    expect(queryBus).toBeDefined();
  });
});
