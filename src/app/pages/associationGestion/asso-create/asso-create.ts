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
        private spinner: NgxSpinnerService,
        // public ssr:
      ) { }

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
          if (!res.data) {
            this.router.navigate(['/associations']);
          }
        },
        (error) => {
          console.error('Erreur lors du chargement des données de l\'association :', error);
          this.router.navigate(['/associations']);
        }
      );
    }
  }

  logoPath:string | ArrayBuffer | null = null;
  coverPath:string | ArrayBuffer | null = null;

  onFileChange(event: Event,type:string): void {
    const fileList = event.target as HTMLInputElement;
    if (fileList.files && fileList.files.length > 0) {
      const file = fileList.files[0];
      if (file.size > 20 * 1024 * 1024) {
        alert("Le fichier dépasse la taille maximale autorisée (20 Mo).");
        return;
      }
      if (type === 'logo') {
        this.nouvelleAssociation.logoFile = fileList.files[0];
        console.log('Logo sélectionné :', fileList.files[0].name);
        this.fichier = file;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>{
          this.logoPath = reader.result;
        }
      }else if (type === 'couverture') {
        this.nouvelleAssociation.logoCouverture = fileList.files[0];
        console.log('Logo sélectionné :', fileList.files[0].name);
        this.fichier = file;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>{
          this.coverPath = reader.result;
        }
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
