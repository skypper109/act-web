import { Component, NgModule, OnInit } from '@angular/core';
import { Association } from '../../../models/association';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Data } from '../../../services/data';
import { Env } from '../../../env';

@Component({
  selector: 'app-asso-accueil',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './asso-accueil.html',
  styleUrl: './asso-accueil.css'
})
export class AssoAccueil implements OnInit {

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

  constructor(private data:Data,
    private router: Router) { }

  ngOnInit(){
    this.data.getData(Env.ASSOCIATION+"list").subscribe(
      (res: any) => {
        this.associations = res && res.data ? res.data : [];
        console.log(res && res.data ? res.data : res);
        this.applyFilters();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // Fonction utilitaire pour formater la date
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const datePart = date.toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
    const timePart = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    return `${datePart}`;
  }
  applyFilters(): void {
    this.filteredAssociations = this.associations.filter(a =>
      (this.filterStatut === 'Tous' || a.statut === this.filterStatut) && (
      a.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      a.phone.toLowerCase().includes(this.searchTerm.toLowerCase()))
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

  confirmDelete(id:number) {
    if (this.selectedAssociation) {
      this.associations = this.associations.filter(a => a.id !== this.selectedAssociation!.id);
      this.data.deleteData(Env.ASSOCIATION,id).subscribe(
        (res: any) => {
          console.log('Association supprimée avec succès');
        },
        (error: any) => {
          console.log('Erreur lors de la suppression de l\'association :', error);
        }
      );
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



  refuserAssociation(asso: Association) {

    this.data.putData(Env.ASSOCIATION+"statut/", asso.id!, 'Rejete','statut').subscribe(
      (res: any) => {
        console.log('Association Rejete avec succès');
        asso.statut = 'Rejete';

      },
      (error: any) => {
        console.log('Erreur lors de la validation de l\'association :', error);
      }
    );
    this.applyFilters();
    this.closeModals();

  }
  validerAssociation(asso: Association) {
    this.data.putData(Env.ASSOCIATION+"statut/", asso.id!,'Actif','statut').subscribe(
      (res: any) => {
        console.log('Association validée avec succès');
        asso.statut = 'Actif';
      },
      (error: any) => {
        console.log('Erreur lors de la validation de l\'association :', error);
      }
    );
    this.applyFilters();
    this.closeModals();
  }
  desactiveAssociation(asso: Association) {
    this.data.putData(Env.ASSOCIATION+"statut/", asso.id!,'Desactif','statut').subscribe(
      (res: any) => {
        console.log('Association Desactiver avec succès');
        asso.statut = 'Actif';
      },
      (error: any) => {
        console.log('Erreur lors de la validation de l\'association :', error);
      }
    );
    this.applyFilters();
    this.closeModals();
  }


}
