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

  constructor(private data:Data,
    private router: Router) { }

  ngOnInit(): void {
    // this.organisations = [
    //   {
    //     id: 1,
    //     nom: 'Organisation Santé Pour Tous',
    //     typeOrganisation: 'Santé',
    //     emailContact: 'sante@example.com',
    //     telephoneContact: '+223 70 12 34 56',
    //     statut: 'Approuver',
    //     dateCreation:new Date('2023-07-15') ,
    //     estActif: true,
    //     descriptionMission: '',
    //     logoFile: null,
    //     siteWeb: '',
    //     adresse: '',
    //     ville: '',
    //     codePostal: '',
    //     pays: '',
    //     nomCompletRepresentant: '',
    //     emailRepresentant: '',
    //     telephoneRepresentant: '',
    //     fonctionRepresentant: '',
    //     numeroEnregistrement: '',
    //     confirmationOfficielle: false,
    //   },
    //   {
    //     id:2,
    //     nom: 'Éducation Pour Tous',
    //     typeOrganisation: 'Éducation',
    //     emailContact: 'education@example.com',
    //     telephoneContact: '+223 76 98 76 54',
    //     statut: 'En-attente',
    //     dateCreation:new Date('2023-08-01') ,
    //     descriptionMission: '',
    //     logoFile: null,
    //     siteWeb: '',
    //     adresse: '',
    //     estActif: true,
    //     ville: '',
    //     codePostal: '',
    //     pays: '',
    //     nomCompletRepresentant: '',
    //     emailRepresentant: '',
    //     telephoneRepresentant: '',
    //     fonctionRepresentant: '',
    //     numeroEnregistrement: '',
    //     confirmationOfficielle: false,

    //   },
    //   {
    //     id: 3,
    //     nom: 'Environnement Vert',
    //     typeOrganisation: 'Environnement',
    //     emailContact: 'environnement@example.com',
    //     telephoneContact: '+223 79 11 22 33',
    //     statut: 'Rejeter',
    //     dateCreation:new Date('2023-06-22') ,
    //     estActif: false,
    //     descriptionMission: '',
    //     logoFile: null,
    //     siteWeb: '',
    //     adresse: '',
    //     ville: '',
    //     codePostal: '',
    //     pays: '',
    //     nomCompletRepresentant: '',
    //     emailRepresentant: '',
    //     telephoneRepresentant: '',
    //     fonctionRepresentant: '',
    //     numeroEnregistrement: '',
    //     confirmationOfficielle: false,
    //   },
    //   {
    //     id: 4,
    //     nom: 'Aide aux Enfants',
    //     typeOrganisation: 'Humanitaire',
    //     emailContact: 'enfants@example.com',
    //     telephoneContact: '+223 65 44 33 22',
    //     statut: 'Rejeter',
    //     dateCreation:new Date('2023-08-05') ,
    //     descriptionMission: '',
    //     logoFile: null,
    //     siteWeb: '',
    //     adresse: '',
    //     estActif: false,
    //     ville: '',
    //     codePostal: '',
    //     pays: '',
    //     nomCompletRepresentant: '',
    //     emailRepresentant: '',
    //     telephoneRepresentant: '',
    //     fonctionRepresentant: '',
    //     numeroEnregistrement: '',
    //     confirmationOfficielle: false,
    //   },
    //   {
    //     id: 5,
    //     nom: 'Culture et Art du Mali',
    //     typeOrganisation: 'Culture',
    //     emailContact: 'culture@example.com',
    //     telephoneContact: '+223 77 88 99 00',
    //     statut: 'Approuver',
    //     dateCreation:new Date('2023-07-30') ,
    //     adresse: 'Bamako, Mali',
    //     descriptionMission: 'Promotion de la culture malienne à travers divers événements et ateliers.',
    //     estActif: true,
    //     logoFile: null,
    //     siteWeb: '',
    //     ville: '',
    //     codePostal: '',
    //     pays: '',
    //     nomCompletRepresentant: '',
    //     emailRepresentant: '',
    //     telephoneRepresentant: '',
    //     fonctionRepresentant: '',
    //     numeroEnregistrement: '',
    //     confirmationOfficielle: false,
    //   },
    //   {
    //     id: 6,
    //     nom: 'Sports Pour Tous',
    //     typeOrganisation: 'Sports',
    //     emailContact: 'sports@example.com',
    //     telephoneContact: '+223 66 55 44 33',
    //     statut: 'Approuver',
    //     dateCreation:new Date('2023-07-10') ,
    //     descriptionMission: '',
    //     logoFile: null,
    //     siteWeb: '',
    //     adresse: '',
    //     estActif: true,
    //     ville: '',
    //     codePostal: '',
    //     pays: '',
    //     nomCompletRepresentant: '',
    //     emailRepresentant: '',
    //     telephoneRepresentant: '',
    //     fonctionRepresentant: '',
    //     numeroEnregistrement: '',
    //     confirmationOfficielle: false
    //   },
    //   {
    //     id: 7,
    //     nom: 'Développement Rural',
    //     typeOrganisation: 'Agriculture',
    //     emailContact: 'rural@example.com',
    //     telephoneContact: '+223 71 22 33 44',
    //     statut: 'En-attente',
    //     dateCreation:new Date('2023-08-03') ,
    //     descriptionMission: '',
    //     logoFile: null,
    //     siteWeb: '',
    //     adresse: '',
    //     estActif: true,
    //     ville: '',
    //     codePostal: '',
    //     pays: '',
    //     nomCompletRepresentant: '',
    //     emailRepresentant: '',
    //     telephoneRepresentant: '',
    //     fonctionRepresentant: '',
    //     numeroEnregistrement: '',
    //     confirmationOfficielle: false,
    //   }
    // ];
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
    // this.applyFilters();
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

  confirmDelete() {
    if (this.selectedOrganisation) {
      this.organisations = this.organisations.filter(a => a.id !== this.selectedOrganisation!.id);
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
