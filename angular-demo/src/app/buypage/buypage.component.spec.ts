import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuypageComponent } from './buypage.component';

describe('BuypageComponent', () => {
  let component: BuypageComponent;
  let fixture: ComponentFixture<BuypageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuypageComponent]
    });
    fixture = TestBed.createComponent(BuypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
