import { Component, ElementRef, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import {  BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AdminService } from 'src/app/core/services/admin.service';
import { io } from 'socket.io-client';
import { CommonService } from 'src/app/core/services/common.service';
import { Champs } from 'src/app/core/models/admin';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showGestTable! : boolean;
  showGestUser!: boolean;
  @ViewChild('sidenav') sidenav: any;
  
  tables!: any;
  tabUser!: any;
  liens!: any;
  attributes!: any;
  cols!: any;
  champs!: any;
  tabl!: { nom: string; rendu: string; }[];

  navSideButton!: boolean;
  showTableUser! : boolean;
  showTableTables! : boolean;

  // Input dans component Ag grid
  datasSub!: Subscription;
  columnDefs : any;
  rowData: any;
  selectedTable: any;
  l!: string;
  a!: string;
  c!: string;
  ch!: Champs[];
  

  private socket: any;

  constructor(private breakpointObserver: BreakpointObserver, private adminService : AdminService, private commonService: CommonService) {
    this.socket = io('http://localhost:8084')
   }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

    closeSideNav() {
      if (this.sidenav._mode =='side') {
        this.sidenav.close();
      }
    }

    
  ngOnInit(): void {
    this.navSideButton = true;
    this.showGestTable = false;
    this.showGestUser = false;
    this.tabl = this.adminService.tables;
    this.tables = this.adminService.tables;
    this.tabUser = this.adminService.tabUser;
    this.liens = this.adminService.liens;
    this.attributes = this.adminService.attributes;
    this.cols = this.adminService.cols;
    this.champs= this.adminService.champs;
  }

  // Fonction qui recupere l'emitter depuis les childs pour bloquer les boutons de nav quand création ou modification
  blockButton(value: boolean){
    this.navSideButton = value
      }

  onShowGestUser() {
    this.showGestTable = false;
    this.showGestUser = true;
  }

  onShowGestTable() {
    this.showGestUser = false;
    this.showGestTable = true;
  }

  onShowTabUser(tab:any){
    this.showTableUser = true;
    this.showGestUser = true;
    this.showGestTable = false;
    this.selectedTable = tab;

    

     // Valeurs récupérées dans le service pour mise en forme des datas
    const lien = this.commonService.getValueByKey(this.liens,tab);
    this.l = lien !== undefined ? lien : '';
    const attribute = this.commonService.getValueByKey(this.attributes,tab);
    this.a = attribute !== undefined ? attribute : '';
    const column = this.commonService.getValueByKey(this.cols,tab);
    this.c = column !== undefined ? column : '';

    // Valeurs des champs de formulaire de la table envoyées dans le component enfant
    const champs = this.commonService.getValueByKey(this.champs,tab);
    this.ch = champs !== undefined ? champs : '';

    this.datasSub = this.adminService.getAllDatas(tab,this.l,this.a,this.c).subscribe(datas => {
      this.showTableTables = true;
      this.columnDefs =  datas[1];
      this.rowData = datas[0];
    });

  

  }



  onShowTables(tab: any) {
   
    this.showTableTables = false;
    this.showGestUser = false;
    this.showGestTable = true;
    this.selectedTable = tab;
   
    // Valeurs récupérées dans le service pour mise en forme des datas
    const lien = this.commonService.getValueByKey(this.liens,tab);
    this.l = lien !== undefined ? lien : '';
    const attribute = this.commonService.getValueByKey(this.attributes,tab);
    this.a = attribute !== undefined ? attribute : '';
    const column = this.commonService.getValueByKey(this.cols,tab);
    this.c = column !== undefined ? column : '';

    // Valeurs des champs de formulaire de la table envoyées dans le component enfant
    const champs = this.commonService.getValueByKey(this.champs,tab);
    this.ch = champs !== undefined ? champs : '';

    this.datasSub = this.adminService.getAllDatas(tab,this.l,this.a,this.c).subscribe(datas => {
      this.showTableTables = true;
      this.columnDefs =  datas[1];
      this.rowData = datas[0];
    });
  }
}
