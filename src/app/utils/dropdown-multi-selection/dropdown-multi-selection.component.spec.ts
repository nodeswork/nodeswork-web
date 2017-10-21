import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMultiSelectionComponent } from './dropdown-multi-selection.component';

describe('DropdownMultiSelectionComponent', () => {
  let component: DropdownMultiSelectionComponent;
  let fixture: ComponentFixture<DropdownMultiSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownMultiSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownMultiSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
