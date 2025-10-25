import { Component, OnInit } from '@angular/core';
import { DonDetailDto } from '../../../models/don-detail';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Data } from '../../../services/data';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Env } from '../../../env';
import { id } from '@swimlane/ngx-charts';
import { DONS_MOCK, DonService } from '../../../services/don-service';

@Component({
  selector: 'app-don-detail',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './don-detail.html',
  styleUrl: './don-detail.css',
})
export class DonDetail implements OnInit {
  don!: DonDetailDto;

  demandaires: any;

  currentImageIndex: number = 0;
  dons: DonDetailDto[] = [];
  beneficiaireSelectionne?: string;
  currentDonId?: number;
  idDon!: number;
  isDetailModalOpen: boolean = false;

  constructor(
    private data: Data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private dataDon: DonService
  ) {}

  ngOnInit() {
    // Vérifier si un ID est présent dans l'URL pour l'édition
    this.idDon = this.route.snapshot.params['id'];
    if (this.idDon) {
      this.loadDons(this.idDon);
    } else {
      this.router.navigateByUrl('/donations');
    }
  }

  searchTerm = '';
  beneficiaries: any[] = [];
  filteredBeneficiaries: any[] = [];
  selectedBeneficiary: any[] = [];
  showSuggestions = false;
  beneficiareID!: number;
  beneficiareName!:string;
  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredBeneficiaries = this.beneficiaries.filter(
      (b) => b.name.toLowerCase().includes(term) || b.phoneNumber.toLowerCase().includes(term)
    );
    this.showSuggestions = true;
  }

  selectBeneficiary(b: any): void {
    this.selectedBeneficiary = b;
    this.searchTerm = `${b.name} (${b.phoneNumber})`;
    this.showSuggestions = false;
    this.currentDonId = this.don.id;
    this.beneficiareID = b.id;
    this.beneficiareName = b.name;
  }

  hideSuggestions(): void {
    setTimeout(() => (this.showSuggestions = false), 200);
  }

  loadDons(id: number) {
    this.spinner.show();
    this.data.getData(Env.LIST_USER).subscribe((res: any) => {
      this.beneficiaries = res;
    });
    this.data.getDataById(Env.DONATION, id).subscribe(
      (res: any) => {
        this.don = res ?? [];
        this.dons = res ?? [];
        if (res.isAvailable != 'DECLINE' && res.isAvailable != 'EN_ATTENTE') {
          this.demandaires = res.demandeurs;
        }
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error('Erreur lors du chargement des dons.', 'Erreur');
      }
    );
  }

  attribuerEtLivrer(id: number) {
    this.isAttribuerModalOpen = true;
    this.openAttribuerModal(id);
    if (!this.beneficiaireSelectionne) {
      this.toastr.warning('Veuillez sélectionner un bénéficiaire.', 'Attention');
      return;
    }
  }

  confirmerDeclin() {
    if (!this.currentDonId) return;

    this.spinner.show();
    this.updateDonStatut(this.currentDonId, 'Decline');
  }

  private updateDonStatut(id: number, statut: string, beneficiaire?: string) {
    this.data.putData(Env.DONATION + 'statut/', id, statut, 'statut').subscribe(
      (res) => {
        const don = this.dons.find((d) => d.id === id);
        // if (don) don.statut = statut;
        this.spinner.hide();
        this.toastr.success(`Don ${statut.toLowerCase()} avec succès.`, 'Succès');
        this.loadDons(this.idDon);
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error('Erreur lors de la mise à jour du don.', 'Erreur');
      }
    );
  }

  // --- Propriétés des Modales ---
  isAttribuerModalOpen: boolean = false;
  isDeclineModalOpen: boolean = false;

  // currentDonId: number | null = null;
  // beneficiaireSelectionne: string = '';
  raisonDeclin: string = '';
  isPublishModalOpen: any;

  allDons: any;

  prevImage(): void {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.don.imageUrls.length) % this.don.imageUrls.length;
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.don.imageUrls.length;
  }

  goToImage(index: number): void {
    this.currentImageIndex = index;
  }

  publier(id: number): void {
    console.log('Action: Publier le don', this.don.id);
    this.openPublishModal(id);
  }

  decliner(): void {
    console.log('Action: Décliner le don', this.don.id);
  }

  notifier(): void {
    console.log('Action: Notifier');
  }

  // attribuerEtLivrer(id:number): void {
  //   console.log(
  //     "Action: Ouvrir le modal d'attribution et marquer comme Livré pour le don",
  //     this.don.id
  //   );
  //   this.openAttribuerModal(id);
  // }

  declinerDon(id: number): void {
    console.log('Action: Décliner/Annuler le don', this.don.id);
    this.openDeclineModal(id);
  }

  modifierAttribution(id: number): void {
    console.log("Action: Modifier l'attribution (Statut ou Bénéficiaire) pour le don", this.don.id);
    // Logique de modification
  }

  supprimer(id: number) {
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
    this.isDetailModalOpen = false;
    // this.currentDonId = null;
  }

  // Action réelle d'attribution et de livraison
  confirmerAttribution(): void {
    if (this.currentDonId && this.selectedBeneficiary) {
      console.log(
        `Don #${this.currentDonId} attribué à : ${this.beneficiareName} et marqué comme LIVRÉ.`
      );

      // Ici, appel de votre service pour mettre à jour le statut et le bénéficiaire
      this.spinner.show();
      this.data
        .putDataNotId(
          Env.DEMANDE_DONATION + this.currentDonId + '/' + this.beneficiareID
        )
        .subscribe(
          (res) => {
            this.spinner.hide();
            console.log(res);
            console.log(this.selectedBeneficiary);
            this.toastr.success(`Don #${this.currentDonId} attribué à : ${this.beneficiareName} et marqué comme LIVRÉ.`,"Succes")
            this.loadDons(this.idDon);
            this.closeModal();
          },
          (err) => {
            console.log(err);
            this.toastr.error(`Une erreur s'est produite lors de l'assignement de don.`,"Erreur");
          }
        );
    }
  }

  openDeclineModal(donId: number): void {
    this.currentDonId = donId;
    this.raisonDeclin = '';
    this.isDeclineModalOpen = true;
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

  detail: any;

  viewDetails(don: any): void {
    this.detail = don;
    this.isDetailModalOpen = true;
  }

  approuver(don: any) {
    this.data.putData(Env.DEMANDE_DONATION, don.id, true, 'accept').subscribe(
      (res) => {
        this.spinner.hide();
        this.toastr.success(`Don ${this.don.title.toLowerCase()} avec succès.`, 'Succès');
        this.loadDons(this.idDon);
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error('Erreur lors de la mise à jour du don.', 'Erreur');
      }
    );
  }

  rejeter(don: any) {
    this.data.putData(Env.DEMANDE_DONATION, don.id, false, 'accept').subscribe(
      (res) => {
        this.spinner.hide();
        this.toastr.success(`Don ${this.don.title.toLowerCase()} avec succès.`, 'Succès');
        this.loadDons(this.idDon);
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error('Erreur lors de la mise à jour du don.', 'Erreur');
      }
    );
  }
}
