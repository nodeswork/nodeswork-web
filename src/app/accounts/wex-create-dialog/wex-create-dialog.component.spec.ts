import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WexCreateDialogComponent } from './wex-create-dialog.component';

describe('WexCreateDialogComponent', () => {
  let component: WexCreateDialogComponent;
  let fixture: ComponentFixture<WexCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WexCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WexCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
