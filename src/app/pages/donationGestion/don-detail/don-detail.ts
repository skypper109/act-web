import { Component, OnInit } from '@angular/core';
import { DonDetailDto } from '../../../models/don-detail';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Data } from '../../../services/data';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Env } from '../../../env';
import { DonService } from '../../../services/don-service';

@Component({
  selector: 'app-don-detail',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './don-detail.html',
  styleUrls: ['./don-detail.css'],
})
export class DonDetail implements OnInit {
  don!: DonDetailDto;
  dons: DonDetailDto[] = [];
  demandaires: any[] = [];

  idDon!: number;
  currentImageIndex = 0;
  isDetailModalOpen = false;

  // --- Modales ---
  isAttribuerModalOpen = false;
  isDeclineModalOpen = false;
  isRevoqueModalOpen = false;
  isPublishModalOpen = false;
  isNotifyModalOpen = false;

  currentDonId?: number;
  raisonDeclin = '';
  message = '';

  // --- Recherche bénéficiaires ---
  searchTerm = '';
  beneficiaries: any[] = [];
  filteredBeneficiaries: any[] = [];
  selectedBeneficiary: any | null = null;
  showSuggestions = false;
  beneficiareID!: number;
  beneficiareName!: string;
  imageUrl: any;

  constructor(
    private data: Data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private dataDon: DonService
  ) {}

  ngOnInit() {
    this.idDon = this.route.snapshot.params['id'];
    if (this.idDon) {
      this.loadDons(this.idDon);
    } else {
      this.router.navigateByUrl('/donations');
    }
  }

  /** ===========================
   *   🔍 Recherche bénéficiaire
   *  =========================== */
  onSearch(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredBeneficiaries = this.beneficiaries.filter(
      (b) =>
        b.name?.toLowerCase().includes(term) ||
        b.phoneNumber?.toLowerCase().includes(term)
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

  /** ===========================
   *   📦 Chargement du don
   *  =========================== */
  loadDons(id: number): void {
    this.spinner.show();
    this.data.getData(Env.LIST_USER).subscribe({
      next: (res: any) => (this.beneficiaries = res),
      error: () => this.toastr.error('Erreur lors du chargement des bénéficiaires.'),
    });

    this.data.getDataById(Env.DONATION, id).subscribe({
      next: (res: any) => {
        this.don = res;
        this.imageUrl = Env.IMAGE_URL;
        this.demandaires = res.demandeurs ?? [];
        console.log(res);
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
        this.toastr.error('Erreur lors du chargement du don.', 'Erreur');
      },
    });
  }

  /** ===========================
   *   ⚙️ Actions sur le don
   *  =========================== */
  attribuerEtLivrer(id: number): void {
    this.openAttribuerModal(id);
  }

  confirmerAttribution(): void {
    if (!this.currentDonId || !this.selectedBeneficiary) {
      this.toastr.warning('Veuillez sélectionner un bénéficiaire.', 'Attention');
      return;
    }

    this.spinner.show();
    this.data
      .putDataNotId(
        `${Env.DEMANDE_DONATION}${this.currentDonId}/${this.beneficiareID}`
      )
      .subscribe({
        next: () => {
          this.spinner.hide();
          this.toastr.success(
            `Don #${this.currentDonId} attribué à ${this.beneficiareName} et marqué comme livré.`,
            'Succès'
          );
          this.loadDons(this.idDon);
          this.closeModal();
        },
        error: () => {
          this.spinner.hide();
          this.toastr.error(`Erreur lors de l’attribution du don.`, 'Erreur');
        },
      });
  }

  confirmerDeclin(): void {
    if (!this.currentDonId) return;
    if (!this.raisonDeclin.trim()) {
      this.toastr.warning('Veuillez entrer une raison de déclin.');
      return;
    }
    this.updateDonStatut(this.currentDonId,"Decline",`?raison=${encodeURIComponent(this.raisonDeclin)}`)
  }
  confirmerRevoque(): void {
    if (!this.currentDonId) return;
    if (!this.raisonDeclin.trim()) {
      this.toastr.warning('Veuillez entrer une raison de revoquez.');
      return;
    }
    this.updateDonStatut(this.currentDonId,"Revoque",`?raison=${encodeURIComponent(this.raisonDeclin)}`)
  }

  confirmerEnvoie(): void {
    if (!this.currentDonId) return;
    const donorID = this.don.donorId;
    if (!this.message.trim()) {
      this.toastr.warning('Veuillez entrer votre message.');
      return;
    }
    this.updateDonStatutPost(this.currentDonId,"Notifie",`/${donorID}?message=${encodeURIComponent(this.message)}`)
  }

  confirmerPublication(): void {
    if (!this.currentDonId) return;
    this.updateDonStatut(this.currentDonId, 'Publie');
    this.closeModal();
  }

  private updateDonStatutPost(id: number, statut: string, param: string = ''): void {
    this.spinner.show();

    this.data.post(`${Env.DONATION}statut/${id}/${statut}${param}`).subscribe({
      next: () => {
        this.spinner.hide();
        this.toastr.success(`Message envoyer avec succès.`, 'Succès');
        this.loadDons(this.idDon);
        this.closeModal();
      },
      error: () => {
        this.spinner.hide();
        this.toastr.error("Erreur lors de l'envoie du message.", 'Erreur');
      },
    });
  }



  private updateDonStatut(id: number, statut: string,param:string=''): void {
    this.spinner.show();
    this.data.put(`${Env.DONATION}statut/${id}/${statut}${param}`).subscribe({
      next: () => {
        this.spinner.hide();
        this.toastr.success(`Don ${statut.toLowerCase()} avec succès.`, 'Succès');
        this.loadDons(this.idDon);
      },
      error: () => {
        this.spinner.hide();
        this.toastr.error('Erreur lors de la mise à jour du don.', 'Erreur');
      },
    });
    this.closeModal()
  }

  /** ===========================
   *   📸 Gestion images
   *  =========================== */
  prevImage(): void {
    if (this.don.imageUrls?.length)
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.don.imageUrls.length) %
        this.don.imageUrls.length;
  }

  nextImage(): void {
    if (this.don.imageUrls?.length)
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.don.imageUrls.length;
  }

  goToImage(index: number): void {
    this.currentImageIndex = index;
  }

  /** ===========================
   *   🪟 Modales
   *  =========================== */
  openAttribuerModal(donId: number): void {
    this.currentDonId = donId;
    this.isAttribuerModalOpen = true;
  }

  openDeclineModal(donId: number): void {
    this.currentDonId = donId;
    this.raisonDeclin = '';
    this.isDeclineModalOpen = true;
  }

  openRevoqueModal(donId: number): void {
    this.currentDonId = donId;
    this.raisonDeclin = '';
    this.isRevoqueModalOpen = true;
  }

  openNotifyModal(donId: number): void {
    this.currentDonId = donId;
    this.message = '';
    this.isNotifyModalOpen = true;
  }

  openPublishModal(donId: number): void {
    this.currentDonId = donId;
    this.isPublishModalOpen = true;
  }

  closeModal(): void {
    this.isAttribuerModalOpen = false;
    this.isDeclineModalOpen = false;
    this.isRevoqueModalOpen = false;
    this.isPublishModalOpen = false;
    this.isDetailModalOpen = false;
    this.isNotifyModalOpen = false;
  }

  /** ===========================
   *   📨 Approbation / Rejet
   *  =========================== */
  approuver(p: any): void {
    this.spinner.show();
    this.data.putData(Env.DEMANDE_DONATION, p.id, true, 'accept').subscribe({
      next: () => {
        this.spinner.hide();
        this.toastr.success(`Demande approuvée.`, 'Succès');
        this.loadDons(this.idDon);
      },
      error: () => {
        this.spinner.hide();
        this.toastr.error('Erreur lors de l’approbation.', 'Erreur');
      },
    });
  }

  rejeter(p: any): void {
    this.spinner.show();
    this.data.putData(Env.DEMANDE_DONATION, p.id, false, 'accept').subscribe({
      next: () => {
        this.spinner.hide();
        this.toastr.success(`Demande rejetée.`, 'Succès');
        this.loadDons(this.idDon);
      },
      error: () => {
        this.spinner.hide();
        this.toastr.error('Erreur lors du rejet.', 'Erreur');
      },
    });
  }

  /** ===========================
   *   👁️ Détails d'une demande
   *  =========================== */
  detail: any;
  viewDetails(p: any): void {
    this.detail = p;
    this.isDetailModalOpen = true;
  }

  notifier(): void {
    this.toastr.info('Notification envoyée (simulation).');
  }
}
