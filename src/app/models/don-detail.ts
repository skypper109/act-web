export class DonDetailDto {
  id!: number;
  title!: string;
  etat!: 'Neuf' | 'Occasion' | 'Reconditionne';
  isAvailable?: 'EN_ATTENTE' | 'PUBLIE' | 'DECLINE' | 'ATTRIBUE' | 'LIVRE';
  location!: string;
  typeDon!: string;
  quantity!: number;
  descriptionCourte!: string;
  descriptionComplete!: string;
  caracteristiques!: string[];
  imageUrls!: string[];
  category?:'AUTRES' | 'EQUIPMENT';
  raisonDeclin?:string;
  createdAt?:Date = new Date(Date.now());
  donorName?:string;
  donorId!:number;
}
