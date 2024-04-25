import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent implements OnInit {
  nom = "";
  prenom = "";
  mail = "";
  tel = "";
  mdp = "";
  selectedFiles: any;
  currentFile: any;
  preview = "";

  constructor(private readonly toast: ToastrService, private readonly dialogRef: DialogRef, private readonly utilisateurService: UtilisateurService) { }

  ngOnInit(): void { }
  createUtilisateur(): void {
    let image: any;
    if (this.selectedFiles) {
      const file: File = this.selectedFiles.item(0);
      const toBase64 = (file: Blob) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
      if (file) toBase64(this.currentFile).then(res => {
        image = res;
        const utilisateur: Utilisateur = {
          id: 0,
          nom: this.nom,
          prenom: this.prenom,
          email: this.mail,
          telephone: this.tel,
          mdp: this.mdp,
          image: image
        }
        this.utilisateurService.addUtilisateur(utilisateur).subscribe(res => {
          if (res) {
            sessionStorage.setItem('id', res.id.toString());
            this.closeClick(res);
          }
          else this.toast.error("Impossible de créer l'utilisateur", "Error Inscription");
        });
      });
    } else {
      const utilisateur: Utilisateur = {
        id: 0,
        nom: this.nom,
        prenom: this.prenom,
        email: this.mail,
        telephone: this.tel,
        mdp: this.mdp,
        image: image
      }
      this.utilisateurService.addUtilisateur(utilisateur).subscribe(res => {
        if (res) {
          sessionStorage.setItem('id', res.id.toString());
          this.closeClick(res);
        }
        else this.toast.error("Impossible de créer l'utilisateur", "Error Inscription");
      });
    }
  }
  closeClick(Utilisateur?: Utilisateur): void {
    this.dialogRef.close(Utilisateur);
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
}
