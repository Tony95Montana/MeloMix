import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Style } from 'src/app/model/Style';

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrl: './style.component.scss'
})
export class StyleComponent implements OnInit {
  style: Style;

  constructor(private readonly dialogRef: DialogRef) {
    this.style = dialogRef.config.data.style;
  }

  ngOnInit(): void {}
  closeClick(): void {
    this.dialogRef.close();
  }
  convert(secondes: number): string {
    let minute = 0;
    let seconde = 0;
    let heure = 0;
    let res = "";
    if (secondes >= 3600) {
      heure = secondes/60/60;
      minute = secondes/60;
      seconde = secondes%60;
    } else {
      minute = secondes/60;
      seconde = secondes%60;
    }
    if (heure != 0) res += heure + ":";
    res += (minute.toString().length == 1) ? "0" + minute + ":" : minute + ":";
    res += (seconde.toString().length == 1) ? "0" + seconde : seconde;
    return res;
  }
}
