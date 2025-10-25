import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Env } from '../env';
import { Notification } from '../models/notification';

// export interface Notification {
//   id: number;
//   title: string;
//   message: string;
//   read: boolean;
//   createdAt: string; // ISO date string
// }

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = Env.NOTIFICATION;
  private _notifications$ = new BehaviorSubject<Notification[]>([]);

  constructor(private http: HttpClient) {}

  // Observable pour les composants
  get notifications$(): Observable<Notification[]> {
    return this._notifications$.asObservable();
  }

  // Charger toutes les notifications
  loadNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl)
      .pipe(tap(notifs => this._notifications$.next(notifs)));
  }

  // Marquer une notification comme lue
  markAsRead(notificationId: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}${notificationId}/read`, {})
      .pipe(tap(() => {
        const notifs = this._notifications$.getValue();
        const index = notifs.findIndex(n => n.id === notificationId);
        if (index !== -1) {
          notifs[index].read = true;
          this._notifications$.next([...notifs]);
        }
      }));
  }

  // Supprimer une notification
  deleteNotification(notificationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${notificationId}`)
      .pipe(tap(() => {
        const notifs = this._notifications$.getValue()
          .filter(n => n.id !== notificationId);
        this._notifications$.next(notifs);
      }));
  }

  // Ajouter une notification localement (utile pour WebSocket)
  addNotification(notification: Notification) {
    const notifs = [notification, ...this._notifications$.getValue()];
    this._notifications$.next(notifs);
  }

  // Compter les notifications non lues
  getUnreadCount(): number {
    return this._notifications$.getValue().filter(n => !n.read).length;
  }
}
