import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAppletAnalysisComponent } from './user-applet-analysis.component';

describe('UserAppletAnalysisComponent', () => {
  let component: UserAppletAnalysisComponent;
  let fixture: ComponentFixture<UserAppletAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAppletAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAppletAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
