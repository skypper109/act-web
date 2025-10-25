export class Notification {
  id?: number;
  type!: string;
  titre!: string;
  contenu!: string;
  destinataires!: string;
  dateCreation!: Date;
  read?:boolean;
  luPar?: number;
  etat?:string;
  totalDestinataires?: number;
}
