import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateTagService } from '.';

describe('CreateTagService', () => {
  let createTagService: CreateTagService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateTagService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createTagService = modRef.get(CreateTagService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createTagService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
