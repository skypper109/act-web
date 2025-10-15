import { Component, NgModule, OnInit } from '@angular/core';
import { Association } from '../../../models/association';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-asso-accueil',
  imports: [CommonModule,FormsModule],
  templateUrl: './asso-accueil.html',
  styleUrl: './asso-accueil.css'
})
export class AssoAccueil implements OnInit {
refuserAssociation(arg0: Association) {
throw new Error('Method not implemented.');
}
validerAssociation(arg0: Association) {
throw new Error('Method not implemented.');
}

  associations: Association[] = [];
  filteredAssociations: Association[] = [];
  searchTerm = '';
  filterStatut = 'Tous';
  currentPage = 1;
  itemsPerPage = 5;

  showViewModal = false;
  showEditModal = false;
  showDeleteModal = false;

  selectedAssociation: Association | null = null;
  editedAssociation: Association | null = null;

  ngOnInit(): void {
    this.associations = [
      { id:1,nom: 'Association Santé Pour Tous', categorie: 'Santé', email: 'sante@example.com', telephone: '+223 70 12 34 56', statut: 'Actif', dateCreation: '2023-07-15', estActif: true },
      { id:2,nom: 'Éducation Pour Tous', categorie: 'Éducation', email: 'education@example.com', telephone: '+223 76 98 76 54', statut: 'En-attente', dateCreation: '2023-08-01' },
      { id:3,nom: 'Environnement Vert', categorie: 'Environnement', email: 'environnement@example.com', telephone: '+223 79 11 22 33', statut: 'Desactif', dateCreation: '2023-06-22' , estActif: false},
      { id:4,nom: 'Aide aux Enfants', categorie: 'Humanitaire', email: 'enfants@example.com', telephone: '+223 65 44 33 22', statut: 'Rejeté', dateCreation: '2023-08-05' },
      { id:5,nom: 'Culture et Art du Mali', categorie: 'Culture', email: 'culture@example.com', telephone: '+223 77 88 99 00', statut: 'Actif', dateCreation: '2023-07-30', adresse: 'Bamako, Mali', description: 'Promotion de la culture malienne à travers divers événements et ateliers.' , estActif: true},
      { id:6,nom: 'Sports Pour Tous', categorie: 'Sports', email: 'sports@example.com', telephone: '+223 66 55 44 33', statut: 'Actif', dateCreation: '2023-07-10' },
      { id:7,nom: 'Développement Rural', categorie: 'Agriculture', email: 'rural@example.com', telephone: '+223 71 22 33 44', statut: 'En-attente', dateCreation: '2023-08-03' }
    ];
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredAssociations = this.associations.filter(a =>
      (this.filterStatut === 'Tous' || a.statut === this.filterStatut) && (
      a.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      a.categorie.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      a.telephone.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  get paginatedAssociations(): Association[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAssociations.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= Math.ceil(this.filteredAssociations.length / this.itemsPerPage)) {
      this.currentPage = page;
    }
  }

   // ---------- MODALES ----------
  openViewModal(asso: Association) {
    this.selectedAssociation = asso;
    this.showViewModal = true;
  }

  openEditModal(asso: Association) {
    this.editedAssociation = { ...asso };
    this.showEditModal = true;
  }

  openDeleteModal(asso: Association) {
    this.selectedAssociation = asso;
    this.showDeleteModal = true;
  }

  closeModals() {
    this.showViewModal = false;
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.selectedAssociation = null;
    this.editedAssociation = null;
  }

  saveEdit() {
    if (this.editedAssociation) {
      const index = this.associations.findIndex(a => a.id === this.editedAssociation!.id);
      this.associations[index] = { ...this.editedAssociation };
      this.applyFilters();
      this.closeModals();
    }
  }

  confirmDelete() {
    if (this.selectedAssociation) {
      this.associations = this.associations.filter(a => a.id !== this.selectedAssociation!.id);
      this.applyFilters();
      this.closeModals();
    }
  }
  verifier(): void {
    if (this.showDeleteModal || this.showEditModal || this.showViewModal) {
      this.closeModals();
    }else{
      return;
    }
  }
}
