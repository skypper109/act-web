import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink
],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  error: boolean = false;
  loginData!: FormGroup;
  constructor(private fb:FormBuilder,private data:Auth,private router:Router) {
  }

  ngOnInit() {
    this.loginData = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }
  onSubmit() {
    console.log(this.loginData.value);
    if (this.loginData.valid) {
      this.data.login(this.loginData.value).subscribe(
        (res)=>{
          Auth.saveToken(res.data.access_token);
          this.router.navigateByUrl("/");
        },
        (error)=>{
          this.error = true;
          console.log(error);
        }
      )
    } else {
      this.error = true;
    }
  }
  changer(){
    this.error = false;
  }

}
