import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAppletEntryComponent } from './user-applet-entry.component';

describe('UserAppletEntryComponent', () => {
  let component: UserAppletEntryComponent;
  let fixture: ComponentFixture<UserAppletEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAppletEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAppletEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
