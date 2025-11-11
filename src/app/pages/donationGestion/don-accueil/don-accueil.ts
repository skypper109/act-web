import { Component, OnInit } from '@angular/core';
import { Don } from '../../../models/don';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DONATION_REQUESTS_MOCK,  DonService, MOCK_SOCIAL_ACTIONS } from '../../../services/don-service';
import { Data } from '../../../services/data';
import { DonIndex } from '../don-index/don-index';
import { error } from 'console';
import { Env } from '../../../env';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DonDetailDto } from '../../../models/don-detail';

@Component({
  selector: 'app-don-accueil',
  imports: [CommonModule,FormsModule],
  templateUrl: './don-accueil.html',
  styleUrl: './don-accueil.css'
})
export class DonAccueil implements OnInit {

  loading = false;

  supprimer(_t39: Don) {
  throw new Error('Method not implemented.');
  }

  dons: DonDetailDto[] = [];
  filteredDons: DonDetailDto[] = [];
  searchTerm = '';
  filterStatut = 'Tous';
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private route:Router,private data:Data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadDons();
  }

  loadDons() {
    this.spinner.show();
    this.data.getData(Env.DONATION).subscribe(
      (res: any) => {
        this.dons = res?.data ?? [];
        this.applyFilters();
        this.spinner.hide();
        console.log(this.dons)
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error("Impossible de charger la liste des Dons.", "Erreur");
        console.error(error);
      }
    );
  }
  applyFilters(): void {
    this.filteredDons = this.dons.filter(d =>
      (this.filterStatut === 'Tous' || d.isAvailable === this.filterStatut) &&(
      d.description.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  get paginatedDons(): DonDetailDto[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredDons.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number): void {
    const maxPage = Math.ceil(this.filteredDons.length / this.itemsPerPage);
    if (page >= 1 && page <= maxPage) {
      this.currentPage = page;
    }
  }

  detail(don: DonDetailDto) {
    console.log("Détail du don:", don);
    this.route.navigate(['donations/detail',don.id]);
  }

  filter(){
    this.filteredDons = this.dons.reverse();
    console.log(this.filteredDons);
  }

  // createDon(){

  //   for (let i = 0; i < DONS_MOCK.length; i++) {
  //     const elem = DONS_MOCK[i];
  //     this.data.postDataWithFile(Env.DONATION,elem,undefined,"donation").subscribe(
  //       (rest)=>{
  //         console.log("response "+i+1+" : "+rest);
  //       },
  //       (err)=>{
  //         console.log("erreur "+i+1+" : "+err);
  //       }
  //     )
  //   }
  // }
  createDon(){

    for (let i = 0; i < MOCK_SOCIAL_ACTIONS.length; i++) {
      const elem = MOCK_SOCIAL_ACTIONS[i];
      this.data.postDataWithFile(Env.URL_API+'action-socials',elem,undefined,"socialAction").subscribe(
        (rest)=>{
          console.log("response "+i+1+" : "+rest);
        },
        (err)=>{
          console.log("erreur "+i+1+" : "+err);
        }
      )
    }
  }

}
