import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppletPreviewComponent } from './applet-preview.component';

describe('AppletPreviewComponent', () => {
  let component: AppletPreviewComponent;
  let fixture: ComponentFixture<AppletPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppletPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppletPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
