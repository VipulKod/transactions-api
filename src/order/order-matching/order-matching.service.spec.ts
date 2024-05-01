import { Test, TestingModule } from '@nestjs/testing';
import { OrderMatchingService } from './order-matching.service';

describe('OrderMatchingService', () => {
  let service: OrderMatchingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderMatchingService],
    }).compile();

    service = module.get<OrderMatchingService>(OrderMatchingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
