import { Component, OnInit } from '@angular/core';
import { Organisation } from '../../../models/organisation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Data } from '../../../services/data';
import { Env } from '../../../env';
import { readFile } from 'node:fs';

@Component({
  selector: 'app-org-create',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './org-create.html',
  styleUrl: './org-create.css'
})
export class OrgCreate implements OnInit {

  fichier!:File;
  // nouvelleOrganisation: Organisation = {
  //   id: 0,
  //   nom: '',
  //   typeOrganisation: '',
  //   descriptionMission: '',
  //   logoFile: null,
  //   emailContact: '',
  //   telephoneContact: '',
  //   siteWeb: '',
  //   adresse: '',
  //   ville: '',
  //   codePostal: '',
  //   pays: 'Mali',
  //   nomCompletRepresentant: '',
  //   fonctionRepresentant: '',
  //   emailRepresentant: '',
  //   telephoneRepresentant: '',
  //   numeroEnregistrement: '',
  //   dateCreation: new Date(Date.now()),
  //   statut: 'Approuver',
  //   confirmationOfficielle: false,
  //   estActif: false
  // };

  nouvelleOrganisation: Organisation = {
    typeOrganisation:'',
    statut:"Approuver",
    dateCreation:new Date(Date.now())
  } as Organisation;
  isEditMode: boolean = false;

  assoID!:number;

  public currentStep = 1;
  public orgTypes = ['Humanitaire', 'Santé', 'Éducation', 'Environnement', 'Autre'];
  isSubmitting = false;

  constructor(
    private organisationService: Data,
    private data:Data,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    // Vérifier si un ID est présent dans l'URL pour l'édition
    this.assoID = this.route.snapshot.params['id'];
    if (this.assoID) {
      // Charger les données de l'association existante pour l'édition
      this.isEditMode = true;
      this.data.getDataById(Env.ORGANISATION, this.assoID).subscribe(
        (res: any) => {
          this.nouvelleOrganisation = res;
          console.log(this.nouvelleOrganisation);
        },
        (error) => {
          console.error('Erreur lors du chargement des données de l\'Ong :', error);
        }
      );
    }
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

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>{
          this.logoPath = reader.result;
        }
        console.log('Logo sélectionné :', this.nouvelleOrganisation.logoFile.name);
      } else if (type === 'couverture') {
        this.nouvelleOrganisation.logoCouverture = input.files[0];

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
      alert("Veuillez remplir tous les champs obligatoires et confirmer les informations.");
      return;
    }

    this.isSubmitting = true;
    if (this.isEditMode) {
        // Mode édition
        this.data.putDataWithFile(Env.ORGANISATION, this.assoID, this.nouvelleOrganisation,this.fichier).subscribe(
          (res) => {
            console.log('Organisation mise à jour avec succès :', res);
            this.router.navigate(['/organisations']);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de l\'Organisation :', error);
          }
        );
        return;
      }

    this.organisationService.postDataWithFile(Env.ORGANISATION,this.nouvelleOrganisation,this.fichier).subscribe({
      next: (response) => {
        alert('Organisation enregistrée avec succès !');
        console.log('Réponse du backend :', response);
        this.isSubmitting = false;
        this.router.navigate(['/organisations']);
      },
      error: (err) => {
        console.error('Erreur lors de l’enregistrement :', err);
        alert('Une erreur est survenue lors de l’enregistrement.');
        this.isSubmitting = false;
      }
    });
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
