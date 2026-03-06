import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitAi } from './outfit-ai';

describe('OutfitAi', () => {
  let component: OutfitAi;
  let fixture: ComponentFixture<OutfitAi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutfitAi],
    }).compileComponents();

    fixture = TestBed.createComponent(OutfitAi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
