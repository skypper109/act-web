import { Component, NgModule, OnInit } from '@angular/core';
import { Association } from '../../../models/association';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Data } from '../../../services/data';
import { Env } from '../../../env';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DonDetailDto } from '../../../models/don-detail';

@Component({
  selector: 'app-asso-accueil',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './asso-accueil.html',
  styleUrl: './asso-accueil.css'
})
export class AssoAccueil implements OnInit {








  //nouveau

  associations: Association[] = [];
  filteredAssociations: Association[] = [];
  searchTerm = '';
  filterStatut = 'Tous';
  currentPage = 1;
  itemsPerPage = 5;

  showViewModal = false;
  showEditModal = false;
  showDeleteModal = false;
  selectedAssociation?: Association;

  constructor(
    private data: Data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route:Router
  ) {}

  ngOnInit(): void {
    this.loadAssociations();
  }

  loadAssociations() {
    this.spinner.show();
    this.data.getData(Env.ASSOCIATION + "list").subscribe(
      (res: any) => {
        this.associations = res?.data ?? [];
        this.applyFilters();
        this.spinner.hide();
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error("Impossible de charger la liste des associations.", "Erreur");
        console.error(error);
      }
    );
  }

  applyFilters() {
    this.filteredAssociations = this.associations.filter(a =>
      (this.filterStatut === 'Tous' || a.statut === this.filterStatut) &&
      a.nomComplet.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  confirmDelete(id: number) {
    if (!this.selectedAssociation) return;
    this.spinner.show();
    this.data.deleteData(Env.ASSOCIATION, id).subscribe(
      res => {
        this.associations = this.associations.filter(a => a.id !== id);
        this.applyFilters();
        this.toastr.success("Association supprimée avec succès.", "Succès");
        this.spinner.hide();
        this.closeModals();
      },
      error => {
        this.spinner.hide();
        this.toastr.error("Erreur lors de la suppression.", "Erreur");
        console.error(error);
      }
    );
  }

  validerAssociation(asso: Association) {
    this.updateAssociationStatut(asso, 'Actif', "Association validée avec succès.");
  }

  refuserAssociation(asso: Association) {
    this.updateAssociationStatut(asso, 'Rejete', "Association refusée.");
  }

  desactiveAssociation(asso: Association) {
    this.updateAssociationStatut(asso, 'Desactif', "Association désactivée.");
  }

  private updateAssociationStatut(asso: Association, statut: string, message: string) {
    this.spinner.show();
    this.data.putData(Env.ASSOCIATION+"statut/", asso.id!,statut,'statut').subscribe(
      res => {
        // asso.statut = statut;
        this.toastr.success(message, "Succès");
        this.loadAssociations();
        this.spinner.hide();
        this.closeModals();
      },
      error => {
        this.spinner.hide();
        this.toastr.error("Erreur lors de la mise à jour du statut.", "Erreur",{
      timeOut: 3000,
      positionClass: 'toast-top-right',
    });
        console.error(error);
      }
    );
  }

  closeModals() {
    this.showViewModal = false;
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.selectedAssociation = undefined;
  }

  editedAssociation: Association | null = null;


  // Fonction utilitaire pour formater la date
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const datePart = date.toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
    const timePart = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    return `${datePart}`;
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

  detail(asso: Association) {
    this.spinner.show();
    // Ici tu peux éventuellement faire un appel API pour les détails
    setTimeout(() => {
      this.spinner.hide();
      this.route.navigate(['/associations/edite',asso.id]);
      this.toastr.info(`Modification de l'association : ${asso.name}`);
    }, 500);
  }


  saveEdit() {
    if (this.editedAssociation) {
      const index = this.associations.findIndex(a => a.id === this.editedAssociation!.id);
      this.associations[index] = { ...this.editedAssociation };
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
