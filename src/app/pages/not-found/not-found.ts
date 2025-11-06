import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css'
})
export class NotFound {

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }

  report() {
    alert('Merci de signaler cette erreur à l’administrateur.');
  }
}
