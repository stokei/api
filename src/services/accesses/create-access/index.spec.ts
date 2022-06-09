import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateAccessService } from '.';

describe('CreateAccessService', () => {
  let createAccessService: CreateAccessService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateAccessService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createAccessService = modRef.get(CreateAccessService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createAccessService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
