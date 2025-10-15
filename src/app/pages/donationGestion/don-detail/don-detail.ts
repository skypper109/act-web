import { Component, OnInit } from '@angular/core';
import { DonDetailDto } from '../../../models/don-detail';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-don-detail',
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './don-detail.html',
  styleUrl: './don-detail.css',
})
export class DonDetail implements OnInit {
  don: DonDetailDto = {
    id: 101,
    titre: 'Fauteuil roulant',
    etat: 'Neuf',
    statut: 'Publie',
    localisation: 'Bamako',
    type: 'Équipement',
    quantite: 12,
    descriptionCourte: 'Description du fauteuil roulant médical',
    descriptionComplete:
      'Un fauteuil roulant médical est un équipement de mobilité conçu pour aider les personnes ayant une incapacité temporaire ou permanente à se déplacer sans effort. Il est utilisé dans les hôpitaux, les centres de rééducation, les maisons de retraite ou à domicile.',
    caracteristiques: [
      "D'un siège ergonomique : rembourré et parfois inclinable pour offrir confort et soutien du dos.",
      "D'un repose-pieds réglable : permettant de maintenir les jambes dans une position confortable.",
      "De grandes roues arrière : qui permettent à l'utilisateur de se propulser lui-même (dans le cas des fauteuils manuels).",
      'De petites roues avant pivotantes : facilitant les manœuvres dans les espaces étroits.',
    ],
    images: ['images/test/don1.png', 'images/test/don2.png', 'images/test/don3.png'],
  };


  currentImageIndex: number = 0;


  // --- Propriétés des Modales ---
  isAttribuerModalOpen: boolean = false;
  isDeclineModalOpen: boolean = false;

  currentDonId: number | null = null;
  beneficiaireSelectionne: string = '';
  raisonDeclin: string = '';
  isPublishModalOpen: any;


  allDons: any;

  constructor() {}

  ngOnInit(): void {}

  prevImage(): void {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.don.images.length) % this.don.images.length;
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.don.images.length;
  }

  goToImage(index: number): void {
    this.currentImageIndex = index;
  }

  publier(id:number): void {
    console.log('Action: Publier le don', this.don.id);
    this.openPublishModal(id);
  }

  decliner(): void {
    console.log('Action: Décliner le don', this.don.id);
  }

  notifier(): void {
    console.log('Action: Notifier');
  }

  attribuerEtLivrer(id:number): void {
    console.log(
      "Action: Ouvrir le modal d'attribution et marquer comme Livré pour le don",
      this.don.id
    );
    this.openAttribuerModal(id);
  }

  declinerDon(id:number): void {
    console.log('Action: Décliner/Annuler le don', this.don.id);
    this.openDeclineModal(id);
  }

  modifierAttribution(id:number): void {
    console.log("Action: Modifier l'attribution (Statut ou Bénéficiaire) pour le don", this.don.id);
    // Logique de modification
  }

  supprimer(id:number) {
    throw new Error('Method not implemented.');
  }
  // --- Méthodes de Gestion des Modales ---

  openAttribuerModal(donId: number): void {
    this.currentDonId = donId;
    this.beneficiaireSelectionne = '';
    this.isAttribuerModalOpen = true;
  }

  closeModal(): void {
    this.isAttribuerModalOpen = false;
    this.isDeclineModalOpen = false;
    this.isPublishModalOpen = false;
    this.currentDonId = null;
  }

  // Action réelle d'attribution et de livraison
  confirmerAttribution(): void {
    if (this.currentDonId && this.beneficiaireSelectionne) {
      console.log(`Don #${this.currentDonId} attribué à : ${this.beneficiaireSelectionne} et marqué comme LIVRÉ.`);

      // Ici, appel de votre service pour mettre à jour le statut et le bénéficiaire
      this.updateDonStatut(this.currentDonId, 'Livré', this.beneficiaireSelectionne);

      this.closeModal();
    }
  }

  openDeclineModal(donId: number): void {
    this.currentDonId = donId;
    this.raisonDeclin = ''; // Réinitialiser la raison
    this.isDeclineModalOpen = true;
  }

  // Action réelle de déclin/annulation
  confirmerDeclin(): void {
    if (this.currentDonId && this.raisonDeclin) {
      console.log(`Don #${this.currentDonId} DÉCLINÉ pour la raison : ${this.raisonDeclin}`);

      this.updateDonStatut(this.currentDonId, 'Annulé');

      this.closeModal();
    }
  }

  openPublishModal(donId: number): void {
    this.currentDonId = donId;
    this.isPublishModalOpen = true;
  }

  confirmerPublication(): void {
    if (this.currentDonId) {
      console.log(`Don #${this.currentDonId} publié avec succès.`);

      this.closeModal();
    }
  }

  // Fonction pour mettre à jour le statut (à intégrer dans votre service réel)
  updateDonStatut(donId: number, statut: 'Livré' | 'En attente' | 'Annulé', beneficiaire?: string): void {
    // Logique pour trouver et mettre à jour le don dans allDons
    const donIndex = this.allDons.findIndex((d: { id: number; }) => d.id === donId);
    if (donIndex !== -1) {
      this.allDons[donIndex].statut = statut;
      if (beneficiaire) {
        this.allDons[donIndex].beneficiaire = beneficiaire;
      }
    }
  }

  viewDetails(donId: number): void {
    const don = this.allDons.find((d: { id: number; }) => d.id === donId);
    if (don && don.statut === 'En attente') {
      this.openAttribuerModal(donId);
    } else {
      console.log(`Naviguer vers la page de détails du don #${donId}`);
    }
  }

}
