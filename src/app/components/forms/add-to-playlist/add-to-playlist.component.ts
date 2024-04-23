import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Musique } from 'src/app/model/Musique';
import { Playlist } from 'src/app/model/Playlist';
import { PlaylistService } from 'src/app/service/playlist.service';

@Component({
  selector: 'app-add-to-playlist',
  templateUrl: './add-to-playlist.component.html',
  styleUrl: './add-to-playlist.component.scss'
})
export class AddToPlaylistComponent implements OnInit {
  musique: Musique;
  playlists: Playlist[] = [];

  constructor(private readonly toast: ToastrService, private readonly dialogRef: DialogRef, private readonly playlistService: PlaylistService) {
    this.musique = dialogRef.config.data.musique;
  }

  ngOnInit(): void {
    this.playlistService.getAllByUser(1).subscribe(res => {
      this.playlists = res;
    });
  }
  addToPlaylist(playlist: Playlist) {
    let flag = false;
    playlist.list_musique.split(",").forEach(element => {
      if(parseInt(element) == this.musique.id) flag = true;
    });
    if (flag) this.toast.error("Cette musique existe déjà dans cette playlist", "Error Duplicata");
    else {
      this.playlistService.addMusiqueTo(this.musique, playlist).subscribe(res => {
        if (res) {
          this.toast.success(this.musique.titre+" à été Ajouter avec succès à la playlist "+playlist.nom, "Ajout à la playlist");
          this.closeClick();
        } else this.toast.error("Erreur l'or de l'ajout à la playlist", "Error Add To Playlist");
      });
    }
  }
  closeClick(): void {
    this.dialogRef.close();
  }
}
