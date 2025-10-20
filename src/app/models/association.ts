export class Association {
  id?: number;
  name!: string;
  categorie?: string;
  email!: string;
  phone!: string;
  statut!: 'Actif' | 'En_attente' | 'Rejete'| 'Desactif';
  dateCreation!: Date;
  address?: string;
  description?: string;
  active?: boolean;
  typeAssociation?:string;
  logoUrl!:string ;
  siteWeb!: string;
  ville!: string;
  codePostal!: string;
  pays!: string;
  nomComplet!:string;
  fonction!: string;

  numeroEnregistrement!: string;
  confirmationOfficielle!: boolean;
}
