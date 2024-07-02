import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { UserCredential } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  signupUsers: any[] = [];
  signupObj: any = {
    userName: '',
    phone: '',
    email: '',
  };

  signinObj: any = {
    email: '',
    password: '',
  };


  isSignup: boolean = false;
  firestore: any;

  showSignupPassword: boolean = false;
  showLoginPassword: boolean = false;

  @ViewChild('loginpassword') loginpassword!: ElementRef<HTMLInputElement>;
  showPassword: boolean = false;

  toggleForm() {
    this.isSignup = !this.isSignup;
  }

  constructor(private authService: UserService, private router: Router) { }

  ngOnInit() {
    this.authService.handleRedirectResult().then((result: UserCredential | null) => {
      if (result) {
        console.log('User signed in with redirect:', result.user);
        this.router.navigate(['/chat']);
      }
    }).catch(error => {
      console.error('Error handling redirect result:', error);
    });
  }

  googleSignIn() {
    this.authService.googleSignIn().then((result: UserCredential) => {
      console.log('User signed in with Google:', result.user);
      this.router.navigate(['/chat']);
    }).catch(error => {
      console.error('Error signing in with Google:', error);
    });
  }

  FacebookSignIn() {
    this.authService.FacebookSignIn();
  }

  TwitterSignIn() {
    this.authService.TwitterSignIn();
  }

  signin() {
    const email = this.signinObj.email;
    const password = this.signinObj.password;
    this.authService.loginUser(email, password)
      .then((res: any) => {
        // this.messageService.showMessage('User Login Successfully', 'success');
        console.log('login success');
        setTimeout(() => {
          this.router.navigate(['/chat']);
        }, 5000); // 10 seconds
      })
      .catch((error: any) => {
        // this.messageService.showMessage('Invalid credentials. Please try again.', 'error');
        console.error('login error', error);
      });
  }

  signup() {
    const email = this.signupObj.email;
    const password = this.signupObj.password;
    this.authService.signupUser(email, password)
      .then(async (res: any) => {
         this.firestore.addsignup(this.signupObj);
        // this.messageService.showMessage('Account created successfully', 'success');
        console.log('signup success');
        setTimeout(() => {
          this.router.navigate(['/chat']);
        }, 5000); // 10 seconds
      })
      .catch((error: any) => {
        // Show error message
        // this.messageService.showMessage('Invalid signup details', 'error');
        console.error('signup error', error);
      });
  }

  togglePasswordVisibility(form: string) {
    if (form === 'signup') {
      this.showSignupPassword = !this.showSignupPassword;
      const input = document.getElementById('signuppassword') as HTMLInputElement;
      input.type = this.showSignupPassword ? 'text' : 'password';
    } else if (form === 'login') {
      this.showLoginPassword = !this.showLoginPassword;
      const input = document.getElementById('loginpassword') as HTMLInputElement;
      input.type = this.showLoginPassword ? 'text' : 'password';
    }
  }

}