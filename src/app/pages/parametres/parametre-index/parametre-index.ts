import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parametre-index',
  imports: [FormsModule,CommonModule],
  templateUrl: './parametre-index.html',
  styleUrl: './parametre-index.css'
})
export class ParametreIndex implements OnInit {

  // Données des réglages (Simulé)
  settings = {
    notificationsEmail: true,
    notificationsSMS: false,
    theme: 'light',
    langue: 'Français',
    twoFactorAuth: false,
  };

  public selectedSection: 'general' | 'securite' | 'notifications' = 'general';
  public languages = ['Français', 'Anglais', 'Bambara'];

  constructor() { }

  ngOnInit(): void {
    // Charger les réglages de l'utilisateur
  }

  // Navigation dans la section des paramètres
  selectSection(section: 'general' | 'securite' | 'notifications'): void {
    this.selectedSection = section;
  }

  // Sauvegarde des réglages
  saveSettings(): void {
    console.log("Sauvegarde des réglages:", this.settings);
    // Appel API pour sauvegarder
    alert("Paramètres sauvegardés !");
  }

  // Action spécifique : Changer le mot de passe
  changePassword(): void {
    console.log("Action: Ouvrir le modal pour changer le mot de passe");
    // Généralement, ceci ouvre un modal
  }
}
