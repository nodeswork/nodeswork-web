import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountControlPanelComponent } from './account-control-panel.component';

describe('AccountControlPanelComponent', () => {
  let component: AccountControlPanelComponent;
  let fixture: ComponentFixture<AccountControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
