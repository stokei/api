import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateVersionService } from '.';

describe('CreateVersionService', () => {
  let createVersionService: CreateVersionService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateVersionService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createVersionService = modRef.get(CreateVersionService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createVersionService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
