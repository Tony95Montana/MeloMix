import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Musique } from 'src/app/model/Musique';
import { Playlist } from 'src/app/model/Playlist';
import { LectureService } from 'src/app/service/lecture.service';
import { MusiqueService } from 'src/app/service/musique.service';
import { PlaylistService } from 'src/app/service/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent implements OnInit, OnDestroy {
  playlist: Playlist;
  listMusique: Musique[] = [];
  subscriptions: Subscription[] = [];

  constructor(private readonly dialogRef: DialogRef, private readonly playlistService: PlaylistService, private readonly lectureService: LectureService, private readonly musiqueService: MusiqueService) {
    this.playlist = dialogRef.config.data.playlist;
  }

  ngOnInit(): void {
    this.subscriptions.push(this.playlistService.getOne(this.playlist.id).subscribe(res => {
      this.playlist = res;
    }));
    this.playlist.list_musique.split(',').filter(x => x != "").forEach(element => {
      this.subscriptions.push(this.musiqueService.getOne(element).subscribe(res => {
        this.listMusique.push(res);
      }));
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
  deleteToPlaylist(musique: Musique): void {
    this.playlistService.delMusiqueTo(musique, this.playlist).subscribe(res => {
      this.playlist = res;
      this.listMusique = this.listMusique.filter(x => x.id != musique.id);
    });
  }
  lecture(musique: Musique): void {
    this.lectureService.updateNumero(musique.id.toString());
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
  closeClick(): void {
    this.dialogRef.close();
  }
}
