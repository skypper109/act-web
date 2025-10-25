import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../env';
import { DonDetailDto } from '../models/don-detail';

@Injectable({
  providedIn: 'root',
})
export class DonService {


  constructor(private http: HttpClient) {}
  creerDon(nb:number) {
    return this.http.post(Env.DONATION, DONS_MOCK[nb]);
  }
  publishDonation(id: number) {
    return this.http.put(`${Env.DONATION}${id}/publish`, {});
  }

  declineDonation(id: number, reason: string) {
    return this.http.put(`${Env.DONATION}${id}/decline?reason=${reason}`, {});
  }

  assignDonation(id: number, beneficiaryId: number) {
    return this.http.put(
      `${Env.DONATION}${id}/assign?beneficiaryId=${beneficiaryId}`,
      {}
    );
  }

  reassignDonation(id: number, newBeneficiaryId: number) {
    return this.http.put(
      `${Env.DONATION}${id}/reassign?newBeneficiaryId=${newBeneficiaryId}`,
      {}
    );
  }

  notifyDonation(id: number) {
    return this.http.post(`${Env.DONATION}${id}/notify`, {});
  }
}



export const DONS_MOCK: DonDetailDto[] = [
  {
    id: 1,
    title: 'Fauteuil roulant médical',
    etat: 'Neuf',
    isAvailable: 'PUBLIE',
    location: 'Bamako',
    typeDon: 'Équipement médical',
    quantity: 12,
    descriptionCourte: 'Description du fauteuil roulant médical ergonomique.',
    descriptionComplete: "Un fauteuil roulant médical, neuf, conçu pour les personnes à mobilité réduite. Doté d'un siège rembourré et de freins performants pour la sécurité.",
    caracteristiques: [
      'Siège ergonomique et inclinable.',
      'Repose-pieds réglable en hauteur.',
      'Grandes roues arrière pour auto-propulsion.',
      'Freins de sécurité intégrés.',
    ],
    imageUrls: ['images/dons/don-1a.png', 'images/dons/don-1b.png'],
    donorId:1,
  },
  {
    id: 2,
    title: 'Livres scolaires (Primaire)',
    etat: 'Occasion',
    isAvailable: 'PUBLIE',
    location: 'Ségou',
    typeDon: 'Éducation',
    quantity: 250,
    descriptionCourte: 'Lot de manuels scolaires pour le cycle primaire.',
    descriptionComplete:
      "250 manuels pour les classes de CP à CM2. Couvrent les mathématiques, le français et l'histoire-géographie. Idéal pour une petite école.",
    caracteristiques: [
      'Couvre les matières principales.',
      'Conforme au programme scolaire actuel.',
      'Usure minimale, aucune page manquante.',
    ],
    imageUrls: ['images/dons/don-2a.png'],
    donorId:1,
  },
  {
    id: 3,
    title: 'Ordinateurs portables reconditionnés',
    etat: 'Reconditionne',
    isAvailable: 'EN_ATTENTE',
    location: 'Mopti',
    typeDon: 'Technologie',
    quantity: 5,
    descriptionCourte: '5 laptops reconditionnés pour usage bureautique.',
    descriptionComplete:
      'Laptops de marque Dell, 8GB RAM, disques SSD. Parfaitement fonctionnels, avec Windows 10 Pro installé. Écrans 14 pouces.',
    caracteristiques: [
      '8 GB de RAM, 256 GB SSD.',
      'Système d’exploitation Windows 10 Pro.',
      'Écrans de 14 pouces, bonne autonomie de batterie.',
    ],
    imageUrls: ['images/dons/don-3a.png', 'images/dons/don-3b.png'],
    donorId:1,
  },
  {
    id: 4,
    title: 'Vêtements chauds pour enfants',
    etat: 'Neuf',
    isAvailable: 'LIVRE',
    location: 'Gao',
    typeDon: 'Habillement',
    quantity: 50,
    descriptionCourte: 'Lot de pulls et manteaux pour enfants (tailles 6-12 ans).',
    descriptionComplete:
      "50 pièces de vêtements neufs, variés (pulls, vestes, manteaux). Destinés à des enfants dans le besoin pour la saison froide.",
    caracteristiques: [
      '100% Neufs, étiquetés.',
      'Tailles assorties (6, 8, 10, 12 ans).',
      'Matières : Laine et coton.',
    ],
    imageUrls: ['images/dons/don-4a.png'],
    donorId:1,
  },
  {
    id: 5,
    title: 'Matériel de cuisine professionnelle',
    etat: 'Occasion',
    isAvailable: 'PUBLIE',
    location: 'Kayes',
    typeDon: 'Nourriture & Cuisine',
    quantity: 1,
    descriptionCourte: 'Grand four à convection industriel.',
    descriptionComplete:
      "Un four à convection professionnel de 20 niveaux. Idéal pour les cantines ou les centres de formation culinaire. Fonctionne sur courant triphasé.",
    caracteristiques: [
      'Capacité : 20 plaques.',
      'Fonctionne au gaz ou à l’électricité (triphasé).',
      'Acier inoxydable, facile à nettoyer.',
    ],
    imageUrls: ['images/dons/don-5a.png', 'images/dons/don-5b.png'],
    donorId:1,
  },
  {
    id: 6,
    title: 'Jouets éducatifs en bois',
    etat: 'Neuf',
    isAvailable: 'PUBLIE',
    location: 'Tombouctou',
    typeDon: 'Loisirs',
    quantity: 30,
    descriptionCourte: '30 lots de puzzles et jeux de construction en bois.',
    descriptionComplete:
      "Des jouets neufs et écologiques. Contribuent au développement de la motricité fine et de la logique chez les enfants de 3 à 6 ans.",
    caracteristiques: [
      'Matériau : Bois naturel et peintures non toxiques.',
      '30 lots différents.',
      'Âge cible : 3-6 ans.',
    ],
    imageUrls: ['images/dons/don-6a.png'],
    donorId:1,
  },
  {
    id: 7,
    title: 'Bancs et tables d\'école',
    etat: 'Occasion',
    isAvailable: 'EN_ATTENTE',
    location: 'Kidal',
    typeDon: 'Mobilier',
    quantity: 45,
    descriptionCourte: '45 ensembles (bancs et tables) pour salles de classe.',
    descriptionComplete:
      'Mobilier scolaire robuste en bois et métal. Peut accueillir environ 90 élèves. Nécessite une légère rénovation.',
    caracteristiques: [
      'Structure métallique, surface en bois.',
      'Lot de 45 ensembles complets.',
      'Conçu pour le niveau secondaire.',
    ],
    imageUrls: ['images/dons/don-7a.png'],
    donorId:1,
  },
  {
    id: 8,
    title: 'Kits de premiers secours',
    etat: 'Neuf',
    isAvailable: 'PUBLIE',
    location: 'Koulikoro',
    typeDon: 'Santé',
    quantity: 10,
    descriptionCourte: '10 trousses de secours complètes et scellées.',
    descriptionComplete:
      "Trousse de premiers secours certifiée CE. Contient des bandages, antiseptiques, ciseaux, gants, etc. Parfait pour les petites cliniques rurales.",
    caracteristiques: [
      'Conforme aux normes sanitaires.',
      'Date de péremption lointaine (2028).',
      'Contenu stérile et emballé individuellement.',
    ],
    imageUrls: ['images/dons/don-8a.png', 'images/dons/don-8b.png'],
    donorId:1,
  },
  {
    id: 9,
    title: 'Génératrice diesel',
    etat: 'Occasion',
    isAvailable: 'DECLINE',
    location: 'Sikasso',
    typeDon: 'Énergie',
    quantity: 1,
    descriptionCourte: 'Génératrice diesel 10 kVA pour alimenter un centre.',
    descriptionComplete:
      "Génératrice de marque Kohler, nécessite un entretien mineur (vidange). Idéale pour l'alimentation de secours d'un bâtiment administratif ou d'un centre de santé.",
    caracteristiques: [
      'Puissance nominale : 10 kVA.',
      'Type de carburant : Diesel.',
      'Démarrage électrique.',
    ],
    imageUrls: ['images/dons/don-9a.png'],
    donorId:1,
  },
  {
    id: 10,
    title: 'Bâches et tentes de secours',
    etat: 'Neuf',
    isAvailable: 'PUBLIE',
    location: 'Bamako',
    typeDon: 'Logistique',
    quantity: 50,
    descriptionCourte: '50 bâches en polyéthylène robustes et imperméables.',
    descriptionComplete:
      "Bâches de grande taille (4m x 6m) pour abris temporaires ou protection de matériel. Résistantes aux UV et aux intempéries. Usage humanitaire.",
    caracteristiques: [
      'Matériau : Polyéthylène haute densité.',
      'Dimensions : 4 mètres x 6 mètres.',
      'Œillets métalliques pour la fixation.',
    ],
    imageUrls: ['images/dons/don-10a.png'],
    donorId:1,
  },
];


export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface DonationRequestDTO {
    id: number;
    message: string;
    status: RequestStatus;
    createdAt: string;
    donationId: number;
    requesterId: number;
}

export const DONATION_REQUESTS_MOCK: DonationRequestDTO[] = [
  {
    id: 1,
    message: "Nous avons un besoin urgent de ce type d'équipement pour notre centre de rééducation.",
    status: 'PENDING',
    createdAt: '2025-10-23T10:00:00Z',
    donationId: 1,
    requesterId: 2,
  },
  {
    id: 2,
    message: "Nous sommes une petite ONG et ces fauteuils nous seraient d'une grande aide.",
    status: 'PENDING',
    createdAt: '2025-10-23T11:30:00Z',
    donationId: 1,
    requesterId: 3,
  },
  {
    id: 3,
    message: "Nous ouvrons une nouvelle bibliothèque rurale et ces livres sont vitaux pour l'éducation.",
    status: 'APPROVED',
    createdAt: '2025-10-23T14:45:00Z',
    donationId: 2,
    requesterId: 4,
  },
  {
    id: 4,
    message: "Demande de la mairie pour les écoles de la région de Ségou.",
    status: 'REJECTED',
    createdAt: '2025-10-24T08:00:00Z',
    donationId: 2,
    requesterId: 2,
  },
  {
    id: 5,
    message: "Notre centre de formation a besoin de ce four pour les cours de cuisine professionnels.",
    status: 'PENDING',
    createdAt: '2025-10-24T10:15:00Z',
    donationId: 5,
    requesterId: 3,
  },
  {
    id: 6,
    message: "Je suis un particulier et je demande ce don pour la cantine du quartier.",
    status: 'PENDING',
    createdAt: '2025-10-24T12:00:00Z',
    donationId: 5,
    requesterId: 4,
  },
  {
    id: 7,
    message: "Demande pour les crèches et jardins d'enfants de Tombouctou.",
    status: 'APPROVED',
    createdAt: '2025-10-24T15:30:00Z',
    donationId: 6,
    requesterId: 2,
  },
  {
    id: 8,
    message: "Les 10 kits seront distribués dans les postes de santé éloignés de Koulikoro.",
    status: 'PENDING',
    createdAt: '2025-10-24T18:00:00Z',
    donationId: 8,
    requesterId: 3,
  },
  {
    id: 9,
    message: "Demande acceptée pour la distribution de vêtements chauds aux populations de Gao.",
    status: 'APPROVED',
    createdAt: '2025-10-22T09:00:00Z',
    donationId: 4,
    requesterId: 4,
  },
  {
    id: 10,
    message: "Nous avons besoin des bâches pour les abris d'urgence.",
    status: 'PENDING',
    createdAt: '2025-10-24T20:00:00Z',
    donationId: 10,
    requesterId: 2,
  },
];
