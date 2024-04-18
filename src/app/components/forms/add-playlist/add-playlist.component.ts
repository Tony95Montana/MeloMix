import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Playlist } from 'src/app/model/Playlist';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrl: './add-playlist.component.scss'
})
export class AddPlaylistComponent implements OnInit {
  nom = "";
  description = "";

  constructor(private dialogRef: DialogRef, private readonly toast: ToastrService) { }

  ngOnInit(): void {}
  createPlaylist(): void {
    if (this.nom == "") this.toast.error("Veuillez entrez un nom", "Nom obligatoire");
    else {
      const playlist: Playlist = {
        id: 0,
        nom: this.nom,
        description: this.description,
        pochette: "",
        id_utilisateur: 1,
        list_musique: ""
      }
      this.dialogRef.close(playlist);
    }
  }
  closeClick(result?: Playlist): void {
    this.dialogRef.close(result);
  }
}
