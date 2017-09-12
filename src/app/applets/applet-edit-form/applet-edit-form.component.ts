import { Component, OnInit }                               from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-applet-edit-form',
  templateUrl: './applet-edit-form.component.html',
  styleUrls: ['./applet-edit-form.component.css']
})
export class AppletEditFormComponent implements OnInit {

  rForm:           FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.rForm = fb.group({
      name: ['', Validators.compose([
        Validators.required,
      ])],
      description: ['', Validators.compose([
        Validators.required,
      ])],
    });
  }

  ngOnInit() {
  }

}
