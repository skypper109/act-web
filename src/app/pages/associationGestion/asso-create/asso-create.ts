import { Component, OnInit } from '@angular/core';
import { Association } from '../../../models/association';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Data } from '../../../services/data';
import { Env } from '../../../env';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-asso-create',
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './asso-create.html',
  styleUrl: './asso-create.css'
})
export class AssoCreate implements OnInit {
  fichier!:File;
  nouvelleAssociation: Association = {
    categorie:"Éducation",
    statut:"En_attente",
    dateCreation:new Date(Date.now())
  } as Association;
  isEditMode: boolean = false;

  assoID!:number;


  public currentStep: number = 1;
  public assoTypes: string[] =  ['Humanitaire', 'Santé', 'Éducation', 'Environnement', 'Autre'];

  constructor(private data:Data,private router:Router,private route:ActivatedRoute,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    // Vérifier si un ID est présent dans l'URL pour l'édition
    this.assoID = this.route.snapshot.params['id'];
    if (this.assoID) {
      // Charger les données de l'association existante pour l'édition
      this.isEditMode = true;
      this.data.getDataById(Env.ASSOCIATION, this.assoID).subscribe(
        (res: any) => {
          this.nouvelleAssociation = res.data;
          console.log(this.nouvelleAssociation);
        },
        (error) => {
          console.error('Erreur lors du chargement des données de l\'association :', error);
        }
      );
    }
  }

  onFileChange(event: any): void {
    const fileList: FileList | null = event.target.files;
    if (fileList != null) {
      // this.nouvelleAssociation.logoUrl = fileList[0];
      this.fichier = fileList[0];
      console.log('Logo sélectionné :', fileList[0].name);
    }
  }

  // onSubmit(): void {
  //   if (this.isFormValid()) {
  //     if (this.isEditMode) {
  //       // Mode édition
  //       this.data.putDataWithFile(Env.ASSOCIATION, this.assoID, this.nouvelleAssociation,this.fichier).subscribe(
  //         (res) => {
  //           console.log('Association mise à jour avec succès :', res);
  //           this.router.navigate(['/associations']);
  //         },
  //         (error) => {
  //           console.error('Erreur lors de la mise à jour de l\'association :', error);
  //         }
  //       );
  //       return;
  //     }
  //     this.data.postDataWithFile(Env.ASSOCIATION+"create",this.nouvelleAssociation,this.fichier).subscribe(
  //     (res)=>{
  //         console.log(res);
  //         this.router.navigate(['/associations']);
  //       },
  //       (error)=>{
  //         console.log(error);
  //         // console.log(this.nouvelleAssociation)
  //       }
  //   );
  //   } else {
  //     alert("Veuillez remplir tous les champs obligatoires et confirmer les informations.");
  //     console.log(this.nouvelleAssociation);
  //   }
  // }

  onSubmit(): void {
    if (!this.isFormValid()) {
      this.toastr.warning("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    this.spinner.show();
    const request$ = this.isEditMode
      ? this.data.putDataWithFile(Env.ASSOCIATION, this.assoID, this.nouvelleAssociation, this.fichier)
      : this.data.postDataWithFile(Env.ASSOCIATION + "create", this.nouvelleAssociation, this.fichier);

    request$.subscribe(
      () => {
        this.spinner.hide();
        this.toastr.success(`Association ${this.isEditMode ? 'mise à jour' : 'créée'} avec succès`);
        this.router.navigate(['/associations']);
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error(`Erreur lors de ${this.isEditMode ? 'la mise à jour' : 'la création'}`);
        console.error(error);
      }
    );
  }



  isFormValid(): boolean {
    const org = this.nouvelleAssociation;

    const isGeneralValid = org.categorie && org.description;

    const isContactValid = org.phone && org.address && org.ville && org.pays;

    const isRepresentantValid = org.name && org.fonction  && org.phone;

    const isAdminValid = org.numeroEnregistrement  && org.confirmationOfficielle;

    return !!(isGeneralValid && isContactValid && isRepresentantValid && isAdminValid);
  }

  annuler(): void {
    this.router.navigate(['/associations']);
  }
  precedentStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  nextStep(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

}
