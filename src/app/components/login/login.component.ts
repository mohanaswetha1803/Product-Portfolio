import { Component } from '@angular/core';
import { DbService } from '../../api/db.service';
import { User } from '../../../user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginHeadersService } from '../../api/login-headers.service';
import { AuthService } from '../../api/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: any = '';
  password: any = '';
  user: User = new User("", "");
  users: any;

  constructor(private service: DbService, private router: Router, private snackBar: MatSnackBar,
              private loginHeaders: LoginHeadersService, private authService: AuthService,
              private toaster: ToastrService) { }

  ngOnInit(): void {
    this.hideButtons();
    this.fetchUsers();
  }

  hideButtons() {
    this.loginHeaders.setButtonsHiddenState(true);
  }

  showButtons() {
    this.loginHeaders.setButtonsHiddenState(false);
  }

  fetchUsers() {
    this.service.getUsers().subscribe(
      (data) => {
        this.users = data;
        console.log('this.users ==>', this.users);
        console.log('this.users.data ==>', this.users?.data);
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.toaster.error('Error fetching users');
      }
    );
  }

  login() {
    if (!this.users || !this.users.data) {
      console.error('No user data available');
      this.toaster.error('No user data available');
      return;
    }

    const userExists = this.users.data.some((user: any) => user.username === this.username && user.password === this.password);

    if (userExists) {
      console.log('Login successful');
      this.showButtons();
      this.toaster.success('Login successful');
      this.authService.login();
      this.router.navigate(['/home']);
    } else {
      console.error('Login failed: Invalid credentials');
      if (this.username === '') {
        this.toaster.warning('Please enter username');
      } else if (this.password === '') {
        this.toaster.warning('Please enter password');
      } else {
        this.toaster.info('Invalid credentials');
      }
    }
  }
}
