import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAppletExecutionsComponent } from './user-applet-executions.component';

describe('UserAppletExecutionsComponent', () => {
  let component: UserAppletExecutionsComponent;
  let fixture: ComponentFixture<UserAppletExecutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAppletExecutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAppletExecutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
