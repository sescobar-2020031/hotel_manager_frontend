import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDangerComponent } from './btn-danger.component';

describe('BtnDangerComponent', () => {
  let component: BtnDangerComponent;
  let fixture: ComponentFixture<BtnDangerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnDangerComponent]
    });
    fixture = TestBed.createComponent(BtnDangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
