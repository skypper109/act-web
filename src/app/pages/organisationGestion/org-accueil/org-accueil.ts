import { Component, OnInit } from '@angular/core';
import { Organisation } from '../../../models/organisation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Env } from '../../../env';
import { Data } from '../../../services/data';

@Component({
  selector: 'app-org-accueil',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './org-accueil.html',
  styleUrl: './org-accueil.css'
})
export class OrgAccueil  implements OnInit {

  organisations: Organisation[] = [];
  filteredOrganisations: Organisation[] = [];
  searchTerm = '';
  filterStatut = 'Tous';
  currentPage = 1;
  itemsPerPage = 5;

  showViewModal = false;
  showEditModal = false;
  showDeleteModal = false;

  selectedOrganisation: Organisation | null = null;
  editedOrganisation: Organisation | null = null;
  imageUrl: string | undefined;

  constructor(private data:Data,
    private router: Router) { }

  ngOnInit(): void {
    this.data.getData(Env.ORGANISATION).subscribe(
          (res: any) => {
            this.organisations =res;
            console.log(res && res.data ? res.data : res);
            this.applyFilters();
          },
          (error: any) => {
            console.log(error);
          }
        );
  }

  applyFilters(): void {
    this.filteredOrganisations = this.organisations.filter(a =>
      (this.filterStatut === 'Tous' || a.statut === this.filterStatut)
    );
  }

  get paginatedOrganisations(): Organisation[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredOrganisations.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= Math.ceil(this.filteredOrganisations.length / this.itemsPerPage)) {
      this.currentPage = page;
    }
  }

   // ---------- MODALES ----------
  openViewModal(asso: Organisation) {
    this.selectedOrganisation = asso;
    this.imageUrl = `${Env.IMAGE_URL + this.selectedOrganisation.logoUrl}`;

    this.showViewModal = true;
  }

  openEditModal(asso: Organisation) {
    this.editedOrganisation = { ...asso };
    this.showEditModal = true;
  }

  openDeleteModal(asso: Organisation) {
    this.selectedOrganisation = asso;
    this.showDeleteModal = true;
  }

  closeModals() {
    this.showViewModal = false;
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.selectedOrganisation = null;
    this.editedOrganisation = null;
  }

  saveEdit() {
    if (this.editedOrganisation) {
      const index = this.organisations.findIndex(a => a.id === this.editedOrganisation!.id);
      this.organisations[index] = { ...this.editedOrganisation };
      this.applyFilters();
      this.closeModals();
    }
  }

  confirmDelete(id:number) {
    if (this.selectedOrganisation) {
      this.organisations = this.organisations.filter(a => a.id !== this.selectedOrganisation!.id);
      this.data.deleteData(Env.ASSOCIATION,id).subscribe(
        (res: any) => {
          console.log('Organisation supprimée avec succès');
        },
        (error: any) => {
          console.log('Erreur lors de la suppression de l\'Organisation :', error);
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
}
