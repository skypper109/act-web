export class Association {
  id!: number;
  nom!: string;
  categorie!: string;
  email!: string;
  telephone!: string;
  statut!: 'Actif' | 'En-attente' | 'Rejeté'| 'Desactif';
  dateCreation!: string;
  adresse?: string;
  description?: string;
  estActif?: boolean;
}
