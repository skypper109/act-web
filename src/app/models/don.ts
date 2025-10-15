export class Don {
  materiel!: string;
  type!: string;
  donateur!: string;
  beneficiaire!: string;
  statut!: 'En-attente' | 'Publie' | 'Decline' | 'Attribue' | 'Livre';
}
