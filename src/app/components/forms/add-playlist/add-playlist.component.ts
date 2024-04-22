import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Playlist } from 'src/app/model/Playlist';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { PlaylistService } from 'src/app/service/playlist.service';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrl: './add-playlist.component.scss'
})
export class AddPlaylistComponent implements OnInit {
  nom = "";
  description = "";
  selectedFiles: any;
  currentFile: any;
  preview = "";

  constructor(private readonly playlistService: PlaylistService, private dialogRef: DialogRef, private readonly toast: ToastrService) { }

  ngOnInit(): void { }
  createPlaylist(): void {
    if (this.nom == "") this.toast.error("Veuillez entrez un nom", "Nom obligatoire");
    else {
      let pochette: any;
      if (this.selectedFiles) {
        const file: File = this.selectedFiles.item(0);
        const toBase64 = (file: Blob) => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
      });
        if (file) toBase64(this.currentFile).then(res => {
          pochette = res;
          const playlist: Playlist = {
            id: 0,
            nom: this.nom,
            description: this.description,
            pochette: pochette,
            Utilisateur: {} as Utilisateur,
            list_musique: ""
          }
          this.playlistService.add(playlist).subscribe(res => {
            if (res) this.dialogRef.close(playlist);
            else this.toast.error("Erreur dans la création d'une playlist", "Erreur Inconnue");
          });
        });
        this.selectedFiles = undefined;
      }
    }
  }
  selectFile(event: any): void {
    this.preview = '';
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.preview = '';
        this.currentFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => { this.preview = e.target.result; };
        reader.readAsDataURL(this.currentFile);
      }
    }
  }
  closeClick(result?: Playlist): void {
    this.dialogRef.close(result);
  }
}
