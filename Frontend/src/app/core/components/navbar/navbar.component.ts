import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TokenStorageService } from '../../services/core_Module/token-storage.service';
import { CommonService } from '../../services/core_Module/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isLoggedIn!: boolean;
  username!: string;
  role!: string;
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
      this.role = user.role;
      this.showAdminBoard = this.role.includes('ADMIN');
      this.showUserBoard = this.role.includes('USER');
      
    }
  }



}
