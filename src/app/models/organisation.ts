export class Organisation {
  id!: number;
  nom!: string;
  typeOrganisation!: string;
  descriptionMission!: string;
  logoFile!: File | null;
  logoCouverture!: File | null;

  // Coordonnées
  emailContact!: string;
  telephoneContact!: string;
  siteWeb!: string;
  adresse!: string;
  ville!: string;
  codePostal!: string;
  pays!: string;

  // Représentant Légal
  nomCompletRepresentant!: string;
  fonctionRepresentant!: string;
  emailRepresentant!: string;
  telephoneRepresentant!: string;

  // Informations Administratives
  numeroEnregistrement!: string;
  dateCreation!:Date // Utiliser un format ISO 8601 pour la soumission
  statut!: 'En-attente' | 'Approuver' | 'Rejeter';
  confirmationOfficielle!: boolean;
  estActif!: boolean;
  logoUrl!: string;
}
