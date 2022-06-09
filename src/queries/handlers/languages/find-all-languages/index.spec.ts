import { Test } from '@nestjs/testing';

import { CountLanguagesRepository } from '@/repositories/languages/count-languages';
import { FindAllLanguagesRepository } from '@/repositories/languages/find-all-languages';

import { FindAllLanguagesQueryHandler } from '.';

describe('FindAllLanguagesQueryHandler', () => {
  let findAllLanguagesRepository: FindAllLanguagesRepository;
  let findAllLanguagesQueryHandler: FindAllLanguagesQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindAllLanguagesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CountLanguagesRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindAllLanguagesQueryHandler
      ]
    }).compile();

    findAllLanguagesRepository = moduleRef.get(FindAllLanguagesRepository);
    findAllLanguagesQueryHandler = moduleRef.get(FindAllLanguagesQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllLanguagesQueryHandler).toBeDefined();
    expect(findAllLanguagesRepository).toBeDefined();
  });
});
