import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularproductComponent } from './popularproduct.component';

describe('PopularproductComponent', () => {
  let component: PopularproductComponent;
  let fixture: ComponentFixture<PopularproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopularproductComponent]
    });
    fixture = TestBed.createComponent(PopularproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
