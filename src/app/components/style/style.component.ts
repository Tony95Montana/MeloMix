import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Musique } from 'src/app/model/Musique';
import { Style } from 'src/app/model/Style';
import { LectureService } from 'src/app/service/lecture.service';

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrl: './style.component.scss'
})
export class StyleComponent implements OnInit {
  style: Style;

  constructor(private readonly lectureService: LectureService, private readonly dialogRef: DialogRef) {
    this.style = dialogRef.config.data.style;
  }

  ngOnInit(): void {}
  lecture(musique: Musique): void {
    this.lectureService.updateNumero(musique.id.toString());
  }
  closeClick(): void {
    this.dialogRef.close();
  }
  convert(secondes: number): string {
    let minute = 0;
    let seconde = 0;
    let heure = 0;
    let res = "";
    if (secondes >= 3600) {
      heure = Math.floor(secondes/60/60);
      minute = Math.floor(secondes/60);
      seconde = secondes%60;
    } else {
      minute = Math.floor(secondes/60);
      seconde = secondes%60;
    }
    if (heure != 0) res += heure + ":";
    res += (minute.toString().length == 1) ? "0" + minute + ":" : minute + ":";
    res += (seconde.toString().length == 1) ? "0" + seconde : seconde;
    return res;
  }
}
