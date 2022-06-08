import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateProductsCategoryService } from '.';

describe('CreateProductsCategoryService', () => {
  let createProductsCategoryService: CreateProductsCategoryService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateProductsCategoryService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createProductsCategoryService = modRef.get(CreateProductsCategoryService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createProductsCategoryService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
