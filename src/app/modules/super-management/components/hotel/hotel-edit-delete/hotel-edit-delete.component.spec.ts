import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelEditDeleteComponent } from './hotel-edit-delete.component';

describe('HotelEditDeleteComponent', () => {
  let component: HotelEditDeleteComponent;
  let fixture: ComponentFixture<HotelEditDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelEditDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelEditDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
