import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsEditDeleteComponent } from './rooms-edit-delete.component';

describe('RoomsEditDeleteComponent', () => {
  let component: RoomsEditDeleteComponent;
  let fixture: ComponentFixture<RoomsEditDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomsEditDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomsEditDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
