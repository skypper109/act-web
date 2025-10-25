import { Component, OnInit } from '@angular/core';
import { Color, NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  imports: [NgxChartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  constructor(private spinner:NgxSpinnerService,private toastr:ToastrService){}

  ngOnInit(): void {
      
  }
  // Cartes statistiques
  stats = [
    { title: 'Associations', value: 42, icon: 'dashboard/association.svg', color: '#6366F1' },

    { title: 'Organisations', value: 15, icon: 'dashboard/organisation.svg', color: '#34D399' },

    { title: 'Dons', value: 187, icon: 'dashboard/don.svg', color: '#FEF9C3' },

    { title: 'Activités', value: 56, icon: 'dashboard/activite.svg', color: '#FEE2E2' }
  ];

  domain: any[] = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'];
  // Graphique barres : Activités par mois
  barChartData = [
    { name: 'Jan', value: 10 },
    { name: 'Fév', value: 18 },
    { name: 'Mar', value: 15 },
    { name: 'Avr', value: 24 },
    { name: 'Mai', value: 30 },
    { name: 'Juin', value: 28 },
  ];

  // Graphique donut : Types d’activités
  pieChartData = [
    { name: 'Santé', value: 45 },
    { name: 'Éducation', value: 30 },
    { name: 'Environnement', value: 15 },
    { name: 'Autres', value: 10 },
  ];

  colorScheme = {
    domain: ['#2E7D32', '#1565C0', '#F9A825', '#9E9E9E']
  };

  // Activités récentes
  recentActivities = [
    { title: 'Nouvelle association', desc: 'Association Santé Pour Tous', time: 'Il y a 23 minutes' },
    { title: 'Don enregistré', desc: '10 fauteuils roulants', time: 'Il y a 2 heures' },
  ];

  // Approbations en attente
  pendingApprovals = [
    { name: 'Éducation Pour Tous', type: 'Association' },
    { name: 'Sante plus', type: 'Association' }
  ];

  approve(item: any) {
    alert(`${item.name} approuvé avec succes`);
  }

  reject(item: any) {
    alert(`${item.name} refusé `);
  }

}
