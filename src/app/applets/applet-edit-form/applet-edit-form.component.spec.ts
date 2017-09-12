import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppletEditFormComponent } from './applet-edit-form.component';

describe('AppletEditFormComponent', () => {
  let component: AppletEditFormComponent;
  let fixture: ComponentFixture<AppletEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppletEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppletEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
