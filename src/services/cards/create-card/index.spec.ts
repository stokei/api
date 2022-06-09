import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateCardService } from '.';

describe('CreateCardService', () => {
  let createCardService: CreateCardService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateCardService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createCardService = modRef.get(CreateCardService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createCardService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
