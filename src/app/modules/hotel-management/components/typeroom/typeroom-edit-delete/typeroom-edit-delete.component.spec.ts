import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyperoomEditDeleteComponent } from './typeroom-edit-delete.component';

describe('TyperoomEditDeleteComponent', () => {
  let component: TyperoomEditDeleteComponent;
  let fixture: ComponentFixture<TyperoomEditDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TyperoomEditDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TyperoomEditDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
