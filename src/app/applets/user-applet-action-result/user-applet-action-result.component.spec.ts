import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAppletActionResultComponent } from './user-applet-action-result.component';

describe('UserAppletActionResultComponent', () => {
  let component: UserAppletActionResultComponent;
  let fixture: ComponentFixture<UserAppletActionResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAppletActionResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAppletActionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
