import { Component, OnInit } from '@angular/core';
import { Don } from '../../../models/don';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-don-accueil',
  imports: [CommonModule,FormsModule],
  templateUrl: './don-accueil.html',
  styleUrl: './don-accueil.css'
})
export class DonAccueil implements OnInit {
supprimer(_t39: Don) {
throw new Error('Method not implemented.');
}

  dons: Don[] = [];
  filteredDons: Don[] = [];
  searchTerm = '';
  filterStatut = 'Tous';
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private route:Router) { }

  ngOnInit(): void {
    this.dons = [
      { materiel: 'Fauteuil roulant', type: 'Matériel médical', donateur: 'Pharmacie Centrale', beneficiaire: 'Hôpital Gabriel Touré', statut: 'Livre' },
      { materiel: 'Béquilles (5 paires)', type: 'Matériel médical', donateur: 'ONG Santé Mali', beneficiaire: 'Non attribué', statut: 'En-attente' },
      { materiel: 'Tensiomètres (10)', type: 'Matériel médical', donateur: 'Dr. Keita', beneficiaire: 'Centre de Santé Communautaire', statut: 'Publie' },
      { materiel: 'Lunettes (15 paires)', type: 'Matériel médical', donateur: 'Opticien Solidaire', beneficiaire: 'Non attribué', statut: 'En-attente' },
      { materiel: 'Médicaments', type: 'Pharmaceutique', donateur: 'Pharmacie du Peuple', beneficiaire: 'Non attribué', statut: 'Decline' },
    ];
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredDons = this.dons.filter(d =>
      (this.filterStatut === 'Tous' || d.statut === this.filterStatut) &&(
      d.materiel.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      d.type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      d.donateur.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      d.beneficiaire.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }
  
  get paginatedDons(): Don[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredDons.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number): void {
    const maxPage = Math.ceil(this.filteredDons.length / this.itemsPerPage);
    if (page >= 1 && page <= maxPage) {
      this.currentPage = page;
    }
  }

  detail(don: Don) {
    console.log("Détail du don:", don);
    this.route.navigateByUrl('donations/detail');
  }
}
