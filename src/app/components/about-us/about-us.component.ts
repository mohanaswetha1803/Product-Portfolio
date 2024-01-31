import { Component, OnInit } from '@angular/core';
import { AboutUsService } from '../../api/about-us.service';
import { AuthService } from '../../api/auth.service';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent implements OnInit {
  teamMembers: any = [];
  constructor(private teamService: AboutUsService,private authService:AuthService) { }
  ngOnInit(): void {
    this.teamService.getTeamMembers().subscribe((data: any[]) => {
      this.teamMembers = data;
    });
  }
  logout() {
    this.authService.logout();
  }
}