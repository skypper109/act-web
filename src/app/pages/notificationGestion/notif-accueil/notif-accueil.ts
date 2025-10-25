import { Component, OnInit } from '@angular/core';
import { Notification } from '../../../models/notification';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../services/notification-service';
import { Data } from '../../../services/data';
import { Env } from '../../../env';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notif-accueil',
  imports: [CommonModule,FormsModule],
  templateUrl: './notif-accueil.html',
  styleUrl: './notif-accueil.css'
})
export class NotifAccueilComponent implements OnInit {


  notifications: Notification[] = [];
  newNotif: Notification = new Notification();
  // selectedNotification?: Notification;

  constructor(
    private data: Data,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.spinner.show();
    this.data.getData(Env.NOTIFICATION).subscribe(
      (res:any)=>{
        this.notifications = res;
        this.filterNotifications();
        console.log(res);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.toastr.error("Erreur lors du chargement des notifications.", "Erreur");
      }
    );
  }
  loading = false;

  saveNew() {
    if (!this.newNotif) return;
    this.loading = true;
    
    this.spinner.show();
    this.data.postData(Env.NOTIFICATION, this.newNotif).subscribe(
      res => {
        this.spinner.hide();
        this.toastr.success("Notification créée avec succès.", "Succès");
        this.notifications.push(this.newNotif);
        this.newNotif = new Notification();
        this.loadNotifications();
        this.closeModals();
      },
      error => {
        this.spinner.hide();
        this.toastr.error("Erreur lors de la création.Veillez bien renseigner les champs.", "Erreur");
      }
    );
  }

  confirmDelete() {
    if (!this.selectedNotification) return;

    this.spinner.show();
    this.data.deleteData(Env.NOTIFICATION, this.selectedNotification.id!).subscribe(
      res => {
        this.spinner.hide();
        this.toastr.success("Notification supprimée.", "Succès");
        this.notifications = this.notifications.filter(n => n.id !== this.selectedNotification!.id);
        this.selectedNotification = null;
        this.loadNotifications();
        this.closeModals();
      },
      error => {
        this.spinner.hide();
        this.toastr.error("Erreur lors de la suppression.", "Erreur");
        this.closeModals();
      }
    );
  }



  // La liste des notifications actuellement affichées
  filteredNotifications: Notification[] = [];

  // Le filtre sélectionné par l'utilisateur
   selectedFilter: string = 'Tous';
    createNotification: Notification | null = null;
    showCreateModal: boolean= false;
    selectedNotification: Notification | null = null;
    showDeleteModal: boolean = false;
    // newNotif: Notification = {
    //   type: '',
    //   titre: '',
    //   contenu: '',
    //   destinataires: '',
    //   dateCreation: new Date(Date.now()),
    // };

  // notifications: Notification[] = [];
  unreadCount = 0;

  // constructor(private data:Data) {}

  // ngOnInit(): void {
  //   this.data.getData(Env.NOTIFICATION).subscribe(
  //     (res:any)=>{
  //       this.notifications = res;
  //       this.filterNotifications();
  //       console.log(res);
  //     },
  //     (error)=>{
  //       console.log(error);
  //     }
  //   )
  // }

// --- LOGIQUE DE FILTRAGE OPTIMISÉE ---
  filterNotifications(): void {
    let filter = this.selectedFilter;
    let notificationsToFilter = this.notifications; // Utilisez la liste source

    // Cas 1 : Aucune filtration (Tous les destinataires)
    if (filter === 'Tous') {
      this.filteredNotifications = [...notificationsToFilter];
    }
    else {
      this.filteredNotifications = notificationsToFilter.filter(notif => {
        return notif.destinataires === filter;
      });
    }

    // Affiche le résultat après le filtre
    console.log(this.filteredNotifications);
  }

  // --- LOGIQUE D'ACTIONS ---
  nouvelleNotification(): void {
    console.log("Action: Ouvrir le formulaire de nouvelle notification");
    this.showCreateModal = true;
    this.newNotif = {
      type: '',
      titre: '',
      contenu: '',
      destinataires: '',
      dateCreation: new Date(Date.now()),
    };

  }

    // saveNew() {
    //   if (this.newNotif) {
    //     this.data.postData(Env.NOTIFICATION,this.newNotif).subscribe(
    //       (res)=>{
    //         console.log(res);
    //       },
    //       (error)=>{
    //         console.log(error);
    //       }
    //     )
    //     this.filterNotifications();
    //     this.closeModals();
    //   }
    // }

  renvoyer(notificationId: number): void {
    console.log(`Action: Renvoyer la notification #${notificationId}`);
  }

  // --- LOGIQUE DE SUPPRESSION ---
  deleteNotification(notificationId: number): void {
    // if (confirm("Êtes-vous sûr de vouloir supprimer cette notification ?")) {
    //   this.notifications = this.notifications.filter(
    //     notif => notif.id !== notificationId
    //   );
    //   this.filterNotifications();
    //   console.log(`Notification #${notificationId} supprimée localement.`);
    // }
    this.selectedNotification = this.notifications.find(n => n.id === notificationId) || null;
    this.showDeleteModal = true;
  }

  // Fonction utilitaire pour formater la date
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const datePart = date.toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
    const timePart = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    return `${datePart} ${timePart}`;
  }



    openCreateModal(notif: Notification) {
      this.createNotification = { ...notif };
      this.showCreateModal = true;
    }

    openDeleteModal(notif: Notification) {
      this.selectedNotification = notif;
      this.showDeleteModal = true;
    }

    closeModals() {
      this.showCreateModal = false;
      this.showDeleteModal = false;
      this.newNotif ={
        type: '',
        titre: '',
        contenu: '',
        destinataires: '',
        dateCreation: new Date(Date.now()),
      };
    }

    // confirmDelete() {
    //   if (this.selectedNotification) {
    //     this.data.deleteData(Env.NOTIFICATION,this.selectedNotification.id!).subscribe(
    //       (res)=>{
    //         console.log(res);
    //         this.notifications = this.notifications.filter(a => a.id !== this.selectedNotification!.id);
    //         this.filterNotifications();
    //         this.closeModals();
    //       },
    //       (error)=>{
    //         console.log(error);
    //       }
    //     )
    //   }
    // }

}
