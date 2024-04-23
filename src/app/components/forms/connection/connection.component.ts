import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.scss'
})
export class ConnectionComponent implements OnInit {
  mail = "";
  mdp = "";

  constructor(private readonly utilisateurService: UtilisateurService, private readonly toast: ToastrService, private readonly dialogRef: DialogRef) {}

  ngOnInit(): void {}
  connect(): void {
    if (this.mail === "") this.toast.error("Veuillez entrez votre email.", "Error : Email non renseigner");
    else if (this.mdp === "") this.toast.error("Veuillez entrez votre mot de passe.", "Error : Mot de passe non renseigner");
    else {
      this.utilisateurService.connection(this.mail, this.mdp).subscribe(res => {
        console.log(res);
      });
    }
  }
  closeClick(result?: Utilisateur): void {
    this.dialogRef.close(result);
  }
}
