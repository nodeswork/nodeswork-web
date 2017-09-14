import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAppletControlPanelComponent } from './my-applet-control-panel.component';

describe('MyAppletControlPanelComponent', () => {
  let component: MyAppletControlPanelComponent;
  let fixture: ComponentFixture<MyAppletControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAppletControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAppletControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
