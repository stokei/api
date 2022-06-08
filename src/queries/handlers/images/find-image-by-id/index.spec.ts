import { FindImageByIdRepository } from '@/repositories/images/find-image-by-id';
import { Test } from '@nestjs/testing';
import { FindImageByIdQueryHandler } from '.';

describe('FindImageByIdQueryHandler', () => {
  let findImageByIdRepository: FindImageByIdRepository;
  let findImageByIdQueryHandler: FindImageByIdQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: FindImageByIdRepository,
          useValue: {
            execute: jest.fn()
          }
        },
        FindImageByIdQueryHandler
      ]
    }).compile();

    findImageByIdRepository = moduleRef.get(FindImageByIdRepository);
    findImageByIdQueryHandler = moduleRef.get(FindImageByIdQueryHandler);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findImageByIdQueryHandler).toBeDefined();
    expect(findImageByIdRepository).toBeDefined();
  });
});
