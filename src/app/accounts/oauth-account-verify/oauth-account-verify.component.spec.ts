import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthAccountVerifyComponent } from './oauth-account-verify.component';

describe('OauthAccountVerifyComponent', () => {
  let component: OauthAccountVerifyComponent;
  let fixture: ComponentFixture<OauthAccountVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OauthAccountVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthAccountVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
