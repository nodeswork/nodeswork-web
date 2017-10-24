import { Component, OnInit }                       from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA }           from '@angular/material';
import {
  FormBuilder, FormGroup, FormControl, Validators,
}                                                  from '@angular/forms';

@Component({
  selector: 'app-wex-create-dialog',
  templateUrl: './wex-create-dialog.component.html',
  styleUrls: ['./wex-create-dialog.component.css']
})
export class WexCreateDialogComponent implements OnInit {

  rForm:           FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<WexCreateDialogComponent>,
  ) {
    this.rForm = fb.group({
      name:    ['Wex Account', Validators.required],
      key:     ['', Validators.required],
      secret:  ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  create() {
    if (!this.rForm.valid) {
      return;
    }

    this.dialogRef.close(this.rForm.value);
  }
}
