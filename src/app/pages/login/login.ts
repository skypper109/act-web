import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  error: boolean = false;
  loginData!: FormGroup;
  constructor(private fb:FormBuilder) {
  }

  ngOnInit() {
    this.loginData = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }
  onSubmit() {
    console.log(this.loginData.value);
    if (this.loginData.value.email === 'admin@gmail.com' && this.loginData.value.password === 'admin') {
      this.error = false;
      localStorage.setItem('isAuthenticated', 'true');
      alert('Login successful!');
      window.location.href = '/';
    } else {
      this.error = true;
    }
  }
  changer(){
    this.error = false;
  }

}
