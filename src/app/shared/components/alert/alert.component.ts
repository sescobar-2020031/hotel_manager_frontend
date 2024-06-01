import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-component',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  icon: undefined;
  iconColor: undefined;
  title: '';
  text: undefined;
  options: false;
  input: false;
  select: false;
  idname: false;
  multiSelect: false;
  button: undefined;
  inputData:string = '';
  password: false;
  items: any[] = [];
  inputType: string = "password";
  iconType: string = "visibility";

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.icon = data.icon;
    this.iconColor = data.iconColor;
    this.title = data.title;
    this.text = data.text;
    this.options = data.options;
    this.input = data.input;
    this.select = data.select;
    this.items = data.items;
    this.button = data.button;
    this.idname = data.idname;
    this.multiSelect = data.multiSelect;
    this.password = data.password;

    if (data.time) {
      setTimeout(() => {
        this.dialogRef.close();
      }, data.time);
    }
  }

  onMouseDown(event:any) {
    if (event.which == 1 || (event.type == 'touchstart' && event.which == 0)) {
      this.inputType = "text"
      this.iconType = "visibility_off"
    }
  }

  onMouseUp() {
    this.inputType = "password"
    this.iconType = "visibility"
  }
}
