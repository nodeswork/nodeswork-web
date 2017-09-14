import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDeviceControlPanelComponent } from './my-device-control-panel.component';

describe('MyDeviceControlPanelComponent', () => {
  let component: MyDeviceControlPanelComponent;
  let fixture: ComponentFixture<MyDeviceControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDeviceControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDeviceControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
