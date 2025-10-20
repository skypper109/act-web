export class ProfilDto {
  nom!: string;
  prenom!: string;
  email!: string;
  telephone!: string;
  role!: 'Gestionnaire' | 'Administrateur' | 'Donateur' | 'Bénéficiaire';
  dateInscription!: string;
  photoUrl!: string | null;
}
