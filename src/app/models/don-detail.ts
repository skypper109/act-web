export class DonDetailDto {
  id!: number;
  titre!: string;
  etat!: 'Neuf' | 'Occasion' | 'Reconditionné';
  statut!: 'En-attente' | 'Publie' | 'Decline' | 'Attribue' | 'Livre';
  localisation!: string;
  type!: string;
  quantite!: number;
  descriptionCourte!: string;
  descriptionComplete!: string;
  caracteristiques!: string[];
  images!: string[];
}
