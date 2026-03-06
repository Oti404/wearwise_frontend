import { TestBed } from '@angular/core/testing';

import { WardrobeService } from './wardrobe';

describe('Wardrobe', () => {
  let service: WardrobeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WardrobeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
