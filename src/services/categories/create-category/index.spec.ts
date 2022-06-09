import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateCategoryService } from '.';

describe('CreateCategoryService', () => {
  let createCategoryService: CreateCategoryService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateCategoryService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createCategoryService = modRef.get(CreateCategoryService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createCategoryService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
