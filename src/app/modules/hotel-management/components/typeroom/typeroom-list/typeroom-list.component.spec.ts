import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyperoomListComponent } from './typeroom-list.component';

describe('TyperoomListComponent', () => {
  let component: TyperoomListComponent;
  let fixture: ComponentFixture<TyperoomListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TyperoomListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TyperoomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
