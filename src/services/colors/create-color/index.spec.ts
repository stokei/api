import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateColorService } from '.';

describe('CreateColorService', () => {
  let createColorService: CreateColorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateColorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createColorService = modRef.get(CreateColorService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createColorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
