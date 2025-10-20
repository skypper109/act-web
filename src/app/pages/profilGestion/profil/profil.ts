import { Component, OnInit } from '@angular/core';
import { ProfilDto } from '../../../models/profil-dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profil',
  imports: [CommonModule,FormsModule],
  templateUrl: './profil.html',
  styleUrl: './profil.css'
})
export class Profil implements OnInit {

  profil!: ProfilDto;

  isEditing: boolean = false;
  editedProfil: ProfilDto = { ...this.profil };

  constructor() { }

  ngOnInit(): void {
    this.loadProfile();
  }
  loadProfile(): void {
    // Simuler le chargement des données du profil (à remplacer par un appel API réel)
    this.profil ={
      nom: 'Admin',
      prenom: 'Act',
      email: 'admin@gmail.com',
      telephone: '+223 77 12 34 56',
      role: 'Administrateur',
      dateInscription: '2023-01-15',
      photoUrl: null
    };
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    // Quand on commence à éditer, on copie les données
    if (this.isEditing) {
      this.editedProfil = { ...this.profil };
    }
  }

  saveProfile(): void {
    // Logique de validation et d'appel API
    console.log("Sauvegarde du profil:", this.editedProfil);

    // Mettre à jour le profil principal si la sauvegarde est réussie
    this.profil = { ...this.editedProfil };
    this.isEditing = false;
    alert("Profil mis à jour avec succès !");
  }

  cancelEdit(): void {
    // Annule les modifications et quitte le mode édition
    this.isEditing = false;
  }
}
