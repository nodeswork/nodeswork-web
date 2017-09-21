import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreateFormComponent } from './account-create-form.component';

describe('AccountCreateFormComponent', () => {
  let component: AccountCreateFormComponent;
  let fixture: ComponentFixture<AccountCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
