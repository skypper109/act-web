import { Component, OnInit } from '@angular/core';
import { Organisation } from '../../../models/organisation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Data } from '../../../services/data';
import { Env } from '../../../env';

@Component({
  selector: 'app-org-create',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './org-create.html',
  styleUrl: './org-create.css'
})
export class OrgCreate implements OnInit {

  fichier!:File;
  nouvelleOrganisation: Organisation = {
    id: 0,
    nom: '',
    typeOrganisation: '',
    descriptionMission: '',
    logoFile: null,
    emailContact: '',
    telephoneContact: '',
    siteWeb: '',
    adresse: '',
    ville: '',
    codePostal: '',
    pays: 'Mali',
    nomCompletRepresentant: '',
    fonctionRepresentant: '',
    emailRepresentant: '',
    telephoneRepresentant: '',
    numeroEnregistrement: '',
    dateCreation: new Date(Date.now()),
    statut: 'Approuver',
    confirmationOfficielle: false,
    estActif: false
  };

  public currentStep = 1;
  public orgTypes = ['Humanitaire', 'Santé', 'Éducation', 'Environnement', 'Autre'];
  isSubmitting = false;

  constructor(
    private organisationService: Data,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onFileChange(event: any): void {
    const fileList: FileList | null = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      if (file.size > 20 * 1024 * 1024) { 
        alert("Le fichier dépasse la taille maximale autorisée (20 Mo).");
        return;
      }
      this.nouvelleOrganisation.logoFile = fileList[0];
      this.fichier = fileList[0];
      console.log('Logo sélectionné :', this.nouvelleOrganisation.logoFile.name);
    }
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      alert("Veuillez remplir tous les champs obligatoires et confirmer les informations.");
      return;
    }

    this.isSubmitting = true;

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
