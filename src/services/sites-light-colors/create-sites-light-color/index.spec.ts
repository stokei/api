import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateSitesLightColorService } from '.';

describe('CreateSitesLightColorService', () => {
  let createSitesLightColorService: CreateSitesLightColorService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CreateSitesLightColorService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile();

    createSitesLightColorService = modRef.get(CreateSitesLightColorService);
    commandBus = modRef.get(CommandBus);
  });

  it('should be defined', () => {
    expect(createSitesLightColorService).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
