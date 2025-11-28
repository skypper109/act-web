import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Env } from '../../env';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  token!: string;
  message = '';
  loading = false;
  success = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupère le token depuis l’URL
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    // Initialise le formulaire
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.resetForm.invalid) {
      this.message = 'Veuillez remplir correctement les champs.';
      return;
    }

    const { password, confirmPassword } = this.resetForm.value;
    if (password !== confirmPassword) {
      this.message = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.loading = true;

    this.http
      .post(Env.URL_API+'reset-password', {
        token: this.token,
        newPassword: password,
      })
      .subscribe({
        next: (res) => {
          this.success = true;
          this.message = 'Mot de passe réinitialisé avec succès !';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err) => {
          console.error(err);
          this.message =
            err.error?.message || 'Erreur lors de la réinitialisation.';
          this.loading = false;
        },
      });
  }
}
