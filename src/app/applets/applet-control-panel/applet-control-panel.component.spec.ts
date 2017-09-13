import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppletControlPanelComponent } from './applet-control-panel.component';

describe('AppletControlPanelComponent', () => {
  let component: AppletControlPanelComponent;
  let fixture: ComponentFixture<AppletControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppletControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppletControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
