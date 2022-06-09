import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreatePageService } from '.';

describe('CreatePageService', () => {
  let createPageService: CreatePageService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreatePageService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createPageService = modRef.get(CreatePageService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createPageService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
