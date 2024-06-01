import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyperoomAddComponent } from './typeroom-add.component';

describe('TyperoomAddComponent', () => {
  let component: TyperoomAddComponent;
  let fixture: ComponentFixture<TyperoomAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TyperoomAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TyperoomAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
