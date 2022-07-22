import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { ColDef, GridApi, GridReadyEvent,  SelectionChangedEvent, ColumnApi } from 'ag-grid-community';
import { CommonService } from 'src/app/core/services/common.service';
import { AdminService }  from 'src/app/core/services/admin.service'
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Users } from 'src/app/core/models/users';
import { CustomValidator } from 'src/app/core/helpers/must-match.validator';
import { Users_Roles } from 'src/app/core/models/users_roles';

@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.css']
})
export class GestionUserComponent implements OnInit,OnDestroy {

  private socket: any;
  
  public gridOptions = {
    defaultColDef : {
      flex: 1,
      resizable: true,
      sortable: true,
      floatingFilter: true
    },
    rowSelection : 'multiple',
    columnHoverHighlight:true
  }

  @Input() columnDefs : any;
  @Input() rowData: any;
  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  
  private selectedRows!: any[] | undefined;
  @Input() datasSub!: Subscription;

  // Variables pour créer et maj User
  public dataUser!: Users ;
  @Input() showTableUser! : boolean;
  userSelected = false;

  creatingUser = false;
  userCreateForm!: FormGroup; 
  createUser_success = false;
  createUser_submitted = false;

  updatingUser = false;
  userUpdateForm!: FormGroup; 
  updateUser_success = false;
  updateUser_submitted = false;

// Variables pour créer et maj User_Role
  public dataUserRole!: Users_Roles ;
  allUserSub! : Subscription;
  users: any;
  allRoleSub! : Subscription;
  roles: any;
  @Input() showTableUser_Role! : boolean;
  userRoleSelected = false;

  creatingUser_Role = false;
  user_RoleCreateForm!: FormGroup; 
  createUser_Role_success = false;
  createUser_Role_submitted = false;

  updatingUser_Role = false;
  user_RoleUpdateForm!: FormGroup; 
  updateUser_Role_success = false;
  updateUser_Role_submitted = false;

 

  

  idLast: any;
  record_success = false;
  
  

  constructor(private commonService: CommonService, private adminService: AdminService, private router: Router,public location: Location,private formBuilder: FormBuilder) { 
    this.socket = io('http://localhost:8084'); 
  }

  ngOnInit(): void {
    this.allRoleSub = this.adminService.getAllRole().subscribe(
      
      datas => this.roles = datas 

    ); 

    this.allUserSub = this.adminService.getAllUser().subscribe(
      
      datas => this.users = datas 

    ); 
    console.log(this.rowData)
    console.log(this.columnDefs)
  }


 
  ngOnDestroy(): void {

    //this.datasSub.unsubscribe();
    this.allRoleSub.unsubscribe();
  
 }


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    
  }

  /*onModelUpdated() {
    this.gridColumnApi.autoSizeAllColumns()
  }*/


 
  onSelectionChanged(event: SelectionChangedEvent) {
   
    this.selectedRows = this.gridApi.getSelectedRows();
      this.selectedRows.forEach((selectedRow) =>{
        this.dataUser = selectedRow
      })

    if(this.showTableUser === true){
      this.userSelected = true;
      this.userRoleSelected = false;
      this.selectedRows = this.gridApi.getSelectedRows();
      this.selectedRows.forEach((selectedRow) =>{
        this.dataUser = selectedRow
      })
    }
    else if (this.showTableUser_Role === true){
      this.userSelected = false;
      this.userRoleSelected = true;
      this.selectedRows = this.gridApi.getSelectedRows();
      this.selectedRows.forEach((selectedRow) =>{
        this.dataUserRole = selectedRow
      })
    }

   
  }

  

  onCellValueChanged(event: any) {

  }


  get fUc() { 
    return this.userCreateForm.controls; 
  };

  get fUu() { 
    return this.userUpdateForm.controls; 
  };

  get fURc() { 
    return this.user_RoleCreateForm.controls; 
  };

  get fURu() { 
    return this.user_RoleUpdateForm.controls; 
  };
 

// Création User


      crUser() {
        this.creatingUser = true;
        this.createUser_success = false;

        this.userCreateForm = this.formBuilder.group({
        username: ['', [ Validators.required ] ],
        email:  ['', [ Validators.required ] ],
        password:  ['', [ Validators.required, Validators.minLength(6) ] ],
        confirmPassword: ['', Validators.required],
        id_role:  [ '', [ Validators.required ] ]
      },{
        validator : CustomValidator.MustMatch('password', 'confirmPassword')
      });
      console.log(this.userCreateForm)
      } 
      

      createUser(): void{

      this.createUser_submitted = true;


      if (this.userCreateForm.invalid) {
        return;
      }


      const data = this.userCreateForm?.value;

      this.adminService.createUser(data)
      .subscribe({
        next: (res) => { 
          this.createUser_success = true;
          this.adminService.getAllUser().subscribe(
        
            datas => this.rowData = datas
      
          ); 
        },
        error: (e) => console.error(e)
      });  
        

      }


  // Maj User

      updateUser(): void{

        if (this.userUpdateForm.invalid) {
          return;
        }

        this.updateUser_submitted = true;
        const id = this.dataUser.id;
        const data = this.userUpdateForm?.value;
        
        this.adminService.updateUser(id,data).subscribe({
          next: (res) => {
          
            this.updateUser_success = true;
            this.adminService.getAllUser().subscribe(
          
              datas => this.rowData = datas
        
            );
          
          
          },
          error: (e) => console.error(e)
          
        });
          
      }

      upUser() {
        this.updatingUser = true;
        this.updateUser_success = false;

        let id = this.dataUser.id;
        const data = this.userUpdateForm?.value;
    

        this.userUpdateForm = this.formBuilder.group({
          username: [this.dataUser.username, [ Validators.required ] ],
          email:  [this.dataUser.email, [ Validators.required ] ],
          password:  [this.dataUser.password, [ Validators.required, Validators.minLength(6) ] ],
          confirmPassword: [this.dataUser.password, Validators.required]  
      },{
          validator : CustomValidator.MustMatch('password', 'confirmPassword')
        });

      }

// Delete User


    deleteUser(): void{
      
      let id = this.dataUser.id    
      this.adminService.deleteUser(id).subscribe({
        next: (res) => {
        
          this.adminService.getAllUser().subscribe(
        
            datas => this.rowData = datas
      
          ); 
        },
        error: (e) => console.error(e)
        
      });;
        
    }



  // Création User_Role

      crUser_Role() {
        this.creatingUser_Role = true;
        this.createUser_Role_success = false;

        this.user_RoleCreateForm = this.formBuilder.group({
          id_user: [''],
        id_role:  [ '', [ Validators.required ] ]
      });
    } 


    createUser_Role(): void{

      this.createUser_Role_submitted = true;

      
      if (this.user_RoleCreateForm.invalid) {
        return;
      }


      const data = this.user_RoleCreateForm?.value;
      
      this.adminService.createUserRole(data)
      .subscribe({
        next: (res) => { 

          this.createUser_Role_success = true;
          this.adminService.getAllUserRole().subscribe(
        
            datas => this.rowData = datas
      
          );
        },
        error: (e) => console.error(e)
      });  
        

}

// Maj User_Role


    updateUser_Role(): void{

      if (this.user_RoleUpdateForm.invalid) {
        return;
      }

      this.updateUser_Role_submitted = true;
      const id = this.dataUserRole.id;
      const data = this.user_RoleUpdateForm?.value;
      
      this.adminService.updateUserRole(id,data).subscribe({
        next: (res) => {
        
          this.updateUser_Role_success = true;
          this.adminService.getAllUserRole().subscribe(
        
            datas => this.rowData = datas
      
          );
        
        
        },
        error: (e) => console.error(e)
        
      });
        
    }

    upUser_Role() {
      this.updatingUser_Role = true;
      this.updateUser_Role_success = false;

      let id = this.dataUserRole.id;
      const data = this.user_RoleUpdateForm?.value;
  

      this.user_RoleUpdateForm = this.formBuilder.group({
        id_user: [this.dataUserRole.id_user],
        username: [{value: this.dataUser.username, disabled: true }],
        id_role:  [this.dataUserRole.id_role, [ Validators.required ] ]
    });

    }

// Delete User_Role


    deleteUser_Role(): void{
          
      let id = this.dataUserRole.id    
      this.adminService.deleteUserRole(id).subscribe({
        next: (res) => {
        
          this.adminService.getAllUserRole().subscribe(
        
            datas => this.rowData = datas
      
          ); 
        },
        error: (e) => console.error(e)
        
      });;
        
    }



return_dashboard_user(){
  this.updatingUser = false;
  this.creatingUser = false;
  this.userSelected = false;
}

return_dashboard_user_role(){
  this.updatingUser_Role = false;
  this.creatingUser_Role = false;
  this.userRoleSelected = false;
}


}
