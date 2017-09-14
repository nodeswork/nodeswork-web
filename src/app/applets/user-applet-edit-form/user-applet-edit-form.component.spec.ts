import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAppletEditFormComponent } from './user-applet-edit-form.component';

describe('UserAppletEditFormComponent', () => {
  let component: UserAppletEditFormComponent;
  let fixture: ComponentFixture<UserAppletEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAppletEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAppletEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
