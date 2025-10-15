import { Component, OnInit } from '@angular/core';
import { Notification } from '../../../models/notification';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notif-accueil',
  imports: [CommonModule,FormsModule],
  templateUrl: './notif-accueil.html',
  styleUrl: './notif-accueil.css'
})
export class NotifAccueilComponent implements OnInit {

  // La liste complète des notifications (source de vérité)
  notifications: Notification[] = [

    {
      id: 1,
      type: 'fonctionnalite',
      titre: 'Nouvelle fonctionnalité disponible',
      description: 'La fonctionnalité de suivi des dons est maintenant disponible.',
      destinataires: 'Ong',
      date: '2023-08-12 14:30',
      luPar: 87,
      totalDestinataires: 150,
    },
    {
      id: 2,
      type: 'maintenance',
      titre: 'Maintenance prévue',
      description: 'Une maintenance est prévue ce soir à 22h. L\'application sera indisponible pendant 2 heures.',
      destinataires: 'Tous',
      date: '2023-08-10 09:15',
      luPar: 132,
      totalDestinataires: 150,
    },
    {
      id: 3,
      type: 'campagne',
      titre: 'Nouvelle campagne de dons',
      description: 'Une nouvelle campagne de dons de matériel médical démarre aujourd\'hui.',
      destinataires: 'Associations',
      date: '2023-08-08 11:20',
      luPar: 38,
      totalDestinataires: 42,
    },
    {
      id: 4,
      type: 'validation',
      titre: 'Validation des activités',
      description: 'N\'oubliez pas de valider vos activités bénévoles de la semaine.',
      destinataires: 'Benevoles',
      date: '2023-08-05 16:45',
      luPar: 72,
      totalDestinataires: 95,
    },
    {
      id: 5,
      type: 'probleme',
      titre: 'Problème technique résolu',
      description: 'Le problème de connexion a été résolu. Merci de votre patience.',
      destinataires: 'Tous',
      date: '2023-08-03 08:30',
      luPar: 150, // Supposons que tout le monde l'a lu
      totalDestinataires: 150,
    },
    ];

  // La liste des notifications actuellement affichées
  filteredNotifications: Notification[] = [];

  // Le filtre sélectionné par l'utilisateur
   selectedFilter: string = 'Tous les destinataires';
    createNotification: Notification | null = null;
    showCreateModal: boolean= false;
    selectedNotification: Notification | null = null;
    showDeleteModal: boolean = false;
    newNotif: Notification | null = null;

  constructor() { }

  ngOnInit(): void {
    // Initialise la liste affichée avec toutes les notifications au chargement
    this.filterNotifications();
  }
// --- LOGIQUE DE FILTRAGE OPTIMISÉE ---
  filterNotifications(): void {
    let filter = this.selectedFilter;
    let notificationsToFilter = this.notifications; // Utilisez la liste source

    // Cas 1 : Aucune filtration (Tous les destinataires)
    if (filter === 'Tous les destinataires') {
      this.filteredNotifications = [...notificationsToFilter];
    }
    // Cas 2 : Filtration par destinataire (Ong, Benevoles, Associations)
    // Note: Assurez-vous que les valeurs de 'this.selectedFilter' (ex: 'Associations')
    // correspondent exactement aux valeurs de 'notif.destinataires'.
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
      id: this.notifications.length + 1,
      type: '',
      titre: '',
      description: '',
      destinataires: '',
      date: new Date().toISOString().slice(0, 16).replace('T', ' '), // Format "YYYY-MM-DD HH:mm"
      luPar: 0,
      totalDestinataires: 0,
    };

  }

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
      this.newNotif = null;
    }

    saveNew() {
      if (this.newNotif) {
        this.notifications = [...this.notifications, this.newNotif];
        this.filterNotifications();
        this.closeModals();
      }
    }

    confirmDelete() {
      if (this.selectedNotification) {
        this.notifications = this.notifications.filter(a => a.id !== this.selectedNotification!.id);
        this.filterNotifications();
        this.closeModals();
      }
    }

}
