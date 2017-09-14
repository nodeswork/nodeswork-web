import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceEntryComponent } from './device-entry.component';

describe('DeviceEntryComponent', () => {
  let component: DeviceEntryComponent;
  let fixture: ComponentFixture<DeviceEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
