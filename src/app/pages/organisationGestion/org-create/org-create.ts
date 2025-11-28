import { Component, OnInit } from '@angular/core';
import { Organisation } from '../../../models/organisation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Data } from '../../../services/data';
import { Env } from '../../../env';
import { readFile } from 'node:fs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-org-create',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './org-create.html',
  styleUrl: './org-create.css'
})
export class OrgCreate implements OnInit {

  logo!:File;

  cover!:File;

  nouvelleOrganisation: Organisation = {
    typeOrganisation:'',
    statut:"Approuver",
    dateCreation:new Date(Date.now())
  } as Organisation;
  isEditMode: boolean = false;

  orgID!:number;

  public currentStep = 1;
  public orgTypes = ['Humanitaire', 'Santé', 'Éducation', 'Environnement', 'Autre'];
  isSubmitting = false;

  constructor(
    private organisationService: Data,
    private data:Data,
    private router:Router,
    private route:ActivatedRoute,
            private toastr: ToastrService,
            private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {

    this.spinner.show();
    // Vérifier si un ID est présent dans l'URL pour l'édition
    this.orgID = this.route.snapshot.params['id'];
    if (this.orgID) {
      // Charger les données de l'association existante pour l'édition
      this.isEditMode = true;
      this.data.getDataById(Env.ORGANISATION, this.orgID).subscribe(
        (res: any) => {
          this.nouvelleOrganisation = res;
          this.logoPath = `${Env.IMAGE_URL + res.profilUrl}`;

          this.coverPath =  `${Env.IMAGE_URL + res.coverUrl}`;
          console.log(this.nouvelleOrganisation);
          this.spinner.hide();
          if (!res) {
            this.router.navigate(['/organisations']);
          }
        },
        (error) => {
          console.error('Erreur lors du chargement des données de l\'Ong :', error);
          this.spinner.hide();
          this.router.navigate(['/organisations']);
        }
      );
    }
    this.spinner.hide();
  }

  logoPath:string | ArrayBuffer | null = null;

  coverPath:string | ArrayBuffer | null = null;

  onFileChange(event: Event,type:string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.size > 20 * 1024 * 1024) {
        alert("Le fichier dépasse la taille maximale autorisée (20 Mo).");
        return;
      }
      if (type === 'logo') {
        this.nouvelleOrganisation.logoFile = input.files[0];

        this.logo = input.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>{
          this.logoPath = reader.result;
        }
        console.log('Logo sélectionné :', this.nouvelleOrganisation.logoFile.name);
      } else if (type === 'couverture') {
        this.nouvelleOrganisation.logoCouverture = input.files[0];

        this.cover = input.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>{
          this.coverPath = reader.result;
        }

        console.log('couverture sélectionnée :', this.nouvelleOrganisation.logoCouverture.name);
      }
    }
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      this.toastr.warning("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    this.spinner.show();

    const request$ = this.isEditMode
      ? this.data.putDataWithFiles(Env.ORGANISATION, this.orgID, this.nouvelleOrganisation, this.logo,undefined,this.cover)
      : this.data.postDataWithFiles(Env.ORGANISATION, this.nouvelleOrganisation, this.logo,undefined,this.cover);

    request$.subscribe(
      () => {
        this.spinner.hide();
        this.toastr.success(`Organisation ${this.isEditMode ? 'mise à jour' : 'créée'} avec succès`);
        this.router.navigate(['/organisations']);
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error(`Erreur lors de ${this.isEditMode ? 'la mise à jour' : 'la création'}`);
        console.error(error);
      }
    );
  }

  isFormValid(): boolean {
    const org = this.nouvelleOrganisation;
    return !!(
      org.nom &&
      org.typeOrganisation &&
      org.descriptionMission &&
      org.emailContact &&
      org.telephoneContact &&
      org.adresse &&
      org.ville &&
      org.pays &&
      org.nomCompletRepresentant &&
      org.fonctionRepresentant &&
      org.emailRepresentant &&
      org.telephoneRepresentant &&
      org.numeroEnregistrement &&
      org.dateCreation
    );
  }

  precedentStep(): void {
    if (this.currentStep > 1) this.currentStep--;
  }

  nextStep(): void {
    if (this.currentStep < 4) this.currentStep++;
  }

  annuler(): void {
    this.router.navigate(['/organisations']);
  }
}
