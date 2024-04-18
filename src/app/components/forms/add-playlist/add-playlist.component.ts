import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/model/Playlist';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrl: './add-playlist.component.scss'
})
export class AddPlaylistComponent implements OnInit {

  constructor(private dialogRef: DialogRef) { }

  ngOnInit(): void {}
  closeClick(result?: Playlist): void {
    this.dialogRef.close(result);
  }
}
