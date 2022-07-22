import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TokenStorageService } from '../../services/token-storage.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isLoggedIn!: boolean;
  username!: string;
  roles!: string;
  showAdminBoard!: boolean;
  showUserBoard!: boolean;
  
  table!: string;
  affiche!: any;


  constructor(private tokenStorageService: TokenStorageService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ADMIN');
      this.showUserBoard = this.roles.includes('USER');
      
    }

  }



  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


}
