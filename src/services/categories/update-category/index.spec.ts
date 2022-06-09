import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateCategoryService } from '.';

describe('UpdateCategoryService', () => {
  let updateCategoryService: UpdateCategoryService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateCategoryService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateCategoryService = modRef.get(UpdateCategoryService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateCategoryService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
