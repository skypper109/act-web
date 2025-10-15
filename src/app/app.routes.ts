import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Index } from './pages/index';
import { authGuard } from './guards/auth-guard';
import { Dashboard } from './pages/dashboard/dashboard';
import { AssoIndex } from './pages/associationGestion/asso-index/asso-index';
import { OrgIndex } from './pages/organisationGestion/org-index/org-index';
import { DonIndex } from './pages/donationGestion/don-index/don-index';
import { NotifIndex } from './pages/notificationGestion/notif-index/notif-index';
import { Profil } from './pages/profilGestion/profil/profil';
import { Role } from './pages/roleGestion/role/role';
import { AssoAccueil } from './pages/associationGestion/asso-accueil/asso-accueil';
import { DonAccueil } from './pages/donationGestion/don-accueil/don-accueil';
import { DonDetail } from './pages/donationGestion/don-detail/don-detail';
import { OrgAccueil } from './pages/organisationGestion/org-accueil/org-accueil';
import { NotifAccueilComponent } from './pages/notificationGestion/notif-accueil/notif-accueil';

export const routes: Routes = [

  {
    path:'',component:Index,
    children:[
      // Les routes pour la page d'accueil
      {path:'',redirectTo:'dashboard',pathMatch:'full'},

      {path:'dashboard',component:Dashboard, data: { titre: 'Tableau de bord' }},

      // Les routes pour la page des associations
      {path:'associations',component:AssoIndex,children:[
          {path:'',component:AssoAccueil},
        ],
        data: { titre: 'Gestion des associations' }
      },

      // Les routes pour la page des organisations
      {path:'organisations',component:OrgIndex,children:[
          {path:'',component:OrgAccueil},
        ],data: { titre: 'Gestion des organisations' }
      },

      // Les routes pour la page des notifications
      {path:'notifications',component:NotifIndex,children:[
          {path:'',component:NotifAccueilComponent},

        ],data: { titre: 'Gestion des notifications' }
      },

      // Les routes pour la page des donations
      {path:'donations',component:DonIndex,children:[

          {path:'',component:DonAccueil},
          {path:'detail',component: DonDetail},

        ],data: { titre: 'Gestion des donations' }
      },

      // Les routes pour la page des roles
      {path:'roles',component:Role,children:[
        {path:'',component:Dashboard},

      ],data: { titre: 'Gestion des roles' }},

      // Les routes pour la page des paramètres
      {path:'parametres',component:Role,children:[
        {path:'',component:Dashboard},

      ],data: { titre: 'Paramètres' }},

      // Les routes pour la page du profil
      {path:'profil',component:Profil,children:[
        {path:'',component:Dashboard},

      ],data: { titre: 'Mon profil' }},

      // {path:'**',redirectTo:'dashboard'}
    ],
    canActivate:[authGuard]
  },

  {path:'login',component:Login},

];
