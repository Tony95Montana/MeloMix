import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Musique } from 'src/app/model/Musique';
import { Playlist } from 'src/app/model/Playlist';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent implements OnInit {
  playlist: Playlist;
  listMusique: Musique[] = [];

  constructor(private readonly dialogRef: DialogRef) {
    this.playlist = dialogRef.config.data.playlist;
  }

  ngOnInit(): void {}
  closeClick(): void {
    this.dialogRef.close();
  }
}
