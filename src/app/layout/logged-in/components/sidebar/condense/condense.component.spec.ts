import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondenseComponent } from './condense.component';

describe('CondenseComponent', () => {
  let component: CondenseComponent;
  let fixture: ComponentFixture<CondenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CondenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
