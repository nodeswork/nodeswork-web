import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FifaFut18CreateDialogComponent } from './fifa-fut-18-create-dialog.component';

describe('FifaFut18CreateDialogComponent', () => {
  let component: FifaFut18CreateDialogComponent;
  let fixture: ComponentFixture<FifaFut18CreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FifaFut18CreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FifaFut18CreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
