import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FifaFut18AccountVerifyComponent } from './fifa-fut-18-account-verify.component';

describe('FifaFut18AccountVerifyComponent', () => {
  let component: FifaFut18AccountVerifyComponent;
  let fixture: ComponentFixture<FifaFut18AccountVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FifaFut18AccountVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FifaFut18AccountVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
