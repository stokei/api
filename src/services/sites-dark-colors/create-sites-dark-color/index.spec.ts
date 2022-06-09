import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CreateSitesDarkColorService } from '.';

describe('CreateSitesDarkColorService', () => {
  let createSitesDarkColorService: CreateSitesDarkColorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateSitesDarkColorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createSitesDarkColorService = modRef.get(CreateSitesDarkColorService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createSitesDarkColorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
