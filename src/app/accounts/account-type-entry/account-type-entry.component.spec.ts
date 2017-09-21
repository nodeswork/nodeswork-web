import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTypeEntryComponent } from './account-type-entry.component';

describe('AccountTypeEntryComponent', () => {
  let component: AccountTypeEntryComponent;
  let fixture: ComponentFixture<AccountTypeEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTypeEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTypeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
