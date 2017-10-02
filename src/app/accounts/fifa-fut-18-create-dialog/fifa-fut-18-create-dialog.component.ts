import { Component, OnInit, Inject }     from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-fifa-fut-18-create-dialog',
  templateUrl: './fifa-fut-18-create-dialog.component.html',
  styleUrls: ['./fifa-fut-18-create-dialog.component.css']
})
export class FifaFut18CreateDialogComponent implements OnInit {

  rForm:           FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FifaFut18CreateDialogComponent>,
  ) {
    this.rForm = fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(EMAIL_REGEX),
      ])],
    });
  }

  ngOnInit() {
  }

  create() {
    if (!this.rForm.valid) {
      return;
    }

    this.dialogRef.close(this.rForm.controls.email.value);
  }

}
