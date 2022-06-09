import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreatePhoneService } from '.';

describe('CreatePhoneService', () => {
  let createPhoneService: CreatePhoneService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreatePhoneService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createPhoneService = modRef.get(CreatePhoneService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createPhoneService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
