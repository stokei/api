import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateProductsCategoryService } from '.';

describe('UpdateProductsCategoryService', () => {
  let updateProductsCategoryService: UpdateProductsCategoryService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateProductsCategoryService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateProductsCategoryService = modRef.get(UpdateProductsCategoryService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateProductsCategoryService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
