import { Component } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-mart';
  user:User=new User("","");
}
