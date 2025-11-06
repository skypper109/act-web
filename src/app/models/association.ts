export class Association {
[x: string]: any;
  id?: number;
  name!: string;
  categorie?: string;
  email!: string;
  phone!: string;
  statut?:   'Actif' | 'En_attente' | 'Rejete'| 'Desactif';
  dateCreation: Date = new Date(Date.now());
  address?: string;
  description?: string;
  active?: boolean;
  typeAssociation?:string;
  logoFile!: File | null;
  logoCouverture!: File | null;
  siteWeb!: string;
  ville!: string;
  codePostal!: string;
  pays!: string;
  nomComplet!:string;
  fonction!: string;

  numeroEnregistrement!: string;
  confirmationOfficielle!: boolean;
}
