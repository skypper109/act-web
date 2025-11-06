import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Env } from '../../env';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  // ----------------------------
  // Données du dashboard
  // ----------------------------
  stats: any[] = [];
  barChartData: any[] = [];
  pieChartData: any[] = [];
  recentActivities: any[] = [];
  pendingApprovals: any[] = [];

  colorScheme = {
    domain: ['#2E7D32', '#1565C0', '#F9A825', '#9E9E9E']
  };

  ngOnInit(): void {
    this.loadDashboard();
  }

  // ----------------------------
  // Charger les données du backend
  // ----------------------------
  loadDashboard(): void {
    this.spinner.show();

    this.http.get(`${Env.URL_API}dashboard/`).subscribe({
      next: (data: any) => {
        this.spinner.hide();

        console.log(data);
        // Cartes principales
        this.stats = [
          { title: 'Associations', value: data.totalAssociations, icon: 'dashboard/association.svg', color: '#6366F1' },
          { title: 'Organisations', value: data.totalOngs, icon: 'dashboard/organisation.svg', color: '#34D399' },
          { title: 'Dons', value: data.totalDonations, icon: 'dashboard/don.svg', color: '#FEF9C3' },
          { title: 'Activités', value: data.totalSocialActions, icon: 'dashboard/activite.svg', color: '#FEE2E2' }
        ];

        // Graphique "Activités par mois"
        this.barChartData = Object.entries(data.actionsPerMonth || {}).map(([mois, valeur]: any) => ({
          name: mois,
          value: valeur
        }));

        // Graphique "Types d’activités"
        this.pieChartData = Object.entries(data.actionsPerType || {}).map(([type, valeur]: any) => ({
          name: type,
          value: valeur
        }));

        // Activités récentes
        const today = new Date(Date.now());
        this.recentActivities = (data.latestSocialActions || [])
          .filter((a: any) => new Date(a.date) <= today)
          .map((a: any) => ({
            title: a.titre,
            desc: a.association,
            time:this.formatTimeAgo(a.date)
          }))
          .sort((a:any, b:any) => new Date(a.time).getTime() - new Date(b.time).getTime())
          .slice(0, 3);

        // Approbations en attente
        this.pendingApprovals = (data.pendingApproval || [])
          .filter((a: any) => new Date(a.date) <= today)
          .map((a: any) => ({
            id: a.id,
            name: a.nom,
            date:this.formatTimeAgo(a.date)
          }))
          .sort((a:any, b:any) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, 3);

      },
      error: (err) => {
        this.spinner.hide();
        console.error(err);
        this.toastr.error('Impossible de charger les données du tableau de bord.', 'Erreur');
      }
    });
  }

  // ----------------------------
  // Actions sur approbations
  // ----------------------------
  approve(item: any) {
    this.toastr.success(`${item.nom} approuvé avec succès.`, 'Succès');
  }

  reject(item: any) {
    this.toastr.warning(`${item.nom} refusé.`, 'Refusé');
  }

  // ----------------------------
  // Formatage du temps
  // ----------------------------
  private formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    if (diffMinutes < 60) return `Il y a ${diffMinutes} min`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `Il y a ${diffHours} h`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `Il y a ${diffDays} j`;

    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks < 4) return `Il y a ${diffWeeks} sem`;

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `Il y a ${diffMonths} mois`;

    const diffYears = Math.floor(diffDays / 365);
    return `Il y a ${diffYears} an${diffYears > 1 ? 's' : ''}`;
  }

}
