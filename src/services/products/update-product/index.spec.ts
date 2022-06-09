import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UpdateProductService } from '.';

describe('UpdateProductService', () => {
  let updateProductService: UpdateProductService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UpdateProductService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    updateProductService = modRef.get(UpdateProductService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(updateProductService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
