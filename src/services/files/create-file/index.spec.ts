import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateFileService } from '.';

describe('CreateFileService', () => {
  let createFileService: CreateFileService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateFileService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createFileService = modRef.get(CreateFileService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createFileService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
