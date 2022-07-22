import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import {  BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AdminService } from 'src/app/core/services/admin.service';
import { io } from 'socket.io-client';
import { CommonService } from 'src/app/core/services/common.service';

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
  liens!: any;
  attributes!: any;
  cols!: any;
  champs!: any;

  showTableUser_Role! : boolean;
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
  ch!: string[];

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
    this.showGestTable = false;
    this.showGestUser = false;
    this.tables = this.adminService.tables;
    this.liens = this.adminService.liens;
    this.attributes = this.adminService.attributes;
    this.cols = this.adminService.cols;
    this.champs= this.adminService.champs;
  }

  onShowGestUser() {
    this.showGestTable = false;
    this.showGestUser = true;
  }

  onShowGestTable() {
    this.showGestUser = false;
    this.showGestTable = true;
  }

  onShowTabUser(){
    this.showTableUser_Role = false;
    this.showTableUser = true;
    this.showGestUser = true;
    this.showGestTable = false;
    this.datasSub = this.adminService.getAllUser().subscribe(datas => {
      this.columnDefs = [{field:'id',hide:true},{field:'username', headerName:'Nom'},{field:'email', headerName:'Mail'},{field:'password', headerName:'Mot de passe'}];
      this.rowData = datas;

    });

  /*  this.socket.on('allUser', (data: any) => {
      this.columnDefs = [{field:'id',hide:true},{field:'username', headerName:'Nom'},{field:'email', headerName:'Mail'},{field:'password', headerName:'Mot de passe'}];
      this.rowData = data;
    });*/

  }


  onShowTabUser_role(){
    this.showTableUser = false;
    this.showTableUser_Role = true;
    this.showGestUser = true;
    this.showGestTable = false;
    this.datasSub = this.adminService.getAllUserRole().subscribe(datas => {
      this.columnDefs = [{field:'id_user',hide:true},{field:'username', headerName:'Nom'},{field:'role', headerName:'Role'},{field:'id_role',hide:true}];
      this.rowData = datas;
    });


    this.socket.on('allUser_Role', (data: any) => {
      this.columnDefs = [{field:'id_user',hide:true},{field:'username', headerName:'Nom'},{field:'role', headerName:'Role'},{field:'id_role',hide:true}];
      this.rowData = data;
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
