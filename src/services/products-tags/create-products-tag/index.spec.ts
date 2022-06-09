import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateProductsTagService } from '.';

describe('CreateProductsTagService', () => {
  let createProductsTagService: CreateProductsTagService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateProductsTagService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createProductsTagService = modRef.get(CreateProductsTagService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createProductsTagService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
