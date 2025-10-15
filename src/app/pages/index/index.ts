import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-index',
  imports: [RouterOutlet, RouterLink,RouterLinkActive],
  templateUrl: './index.html',
  styleUrl: './index.css'
})
export class Index implements  OnInit{
  titre: string = 'Tableau de bord';
  constructor(private router:Router,private route:ActivatedRoute){}
  ngOnInit(){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
          let route = this.route.firstChild;
          while (route?.firstChild) route = route.firstChild;
          return route?.snapshot.data?.['titre'] || 'Tableau de bord';
        })
    ).subscribe(title => (this.titre = title));
  }
  deconnexion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
