import { Component, OnInit, Inject }               from '@angular/core';
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
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.rForm = fb.group({
      name:    [data.accountCategory.name, Validators.required],
      key:     ['', Validators.required],
      secret:  ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  create() {
    if (!this.rForm.valid) {
      this.rForm.controls.name.markAsTouched();
      this.rForm.controls.key.markAsTouched();
      this.rForm.controls.secret.markAsTouched();
      return;
    }

    this.dialogRef.close(this.rForm.value);
  }
}
