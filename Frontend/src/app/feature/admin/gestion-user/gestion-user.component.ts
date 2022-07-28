import { Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { ColDef, GridApi, GridReadyEvent,  SelectionChangedEvent, ColumnApi } from 'ag-grid-community';
import { CommonService } from 'src/app/core/services/common.service';
import { AdminService }  from 'src/app/core/services/admin.service'
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/core/helpers/must-match.validator';
import { Champs } from 'src/app/core/models/admin';


@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.css']
})
export class GestionUserComponent implements OnInit {

  @Input() columnDefs : any;
  @Input() rowData: any;
  @Input() datasSub!: Subscription;
  @Input() selectedTable: any;
  @Input() l!: any;
  @Input() a!: any;
  @Input() c!: any;
  @Input() ch!: Champs[];
  @Output() blockNavSideButton = new EventEmitter();
  @Input() navSideButton! : boolean; 

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

  private selectedRows!: any[] | undefined;
  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;
  public datas!: any ;
  public selected!: boolean;
  

  // Variables pour formulaire création
  creating!: boolean;
  create_submitted = false;
  create_success = false;
  createForm!: FormGroup;
  createUserForm!: FormGroup;

  // Variables pour formulaire mise à jour
  updating!: boolean;
  update_submitted = false;
  update_success = false;
  updateForm!: FormGroup;

  // Variables pour occurences listes prédef.
  allOccListSub!: Subscription;
  occur: {chForm: string,id: string, value: string}[] = []
  
 


  constructor(private adminService: AdminService, private commonService: CommonService, private formBuilder: FormBuilder) { }

  
  ngOnInit() {
    
    this.selected = false;

 // On récupère toutes les occurences des listes prédéfinies
    this.ch.forEach((val: any) => {

      if(val.type === 'select') {

            this.allOccListSub = this.commonService.getAllOccur({table :val.tab_lie,occ:val.occ}).subscribe({
              next: (datas) => { 
              
                       for (let i=0; i<datas.length; i++){
                          this.occur.push( {chForm: val.nom, id : datas[i].id , value : datas[i][val.nom_lie]})
                       }
                         
              },
              error: (e) => console.error(e)
           })
      }
    })

  }

  



  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
   // this.gridApi.setDomLayout('print');
   // this.gridColumnApi.autoSizeAllColumns()
  }

  
  onSelectionChanged(event: SelectionChangedEvent) {
   
    this.selectedRows = this.gridApi.getSelectedRows();
      this.selectedRows.forEach((selectedRow) =>{
        this.datas = selectedRow
      })
   
      this.selected = true;

  }

  onCellValueChanged(event: any) {

  }


 
// Méthode pour accès aux controls du formulaire (création et update)
  get champForm() {
    return this.createForm.controls['champForm'] as FormArray;
  }

  get f() { 
    return this.createUserForm.controls; 
  };

  // Méthode pour accès aux controls dans le formArray
  getControlInArray(n: number)  {
    
       return this.champForm.controls[n]
  }
 

// Méthodes d'initialisation du formulaire pour les users (création et modification)
  initFormUser() {
        this.createUserForm = this.formBuilder.group({
        username: ['', [ Validators.required ] ],
        email:  ['', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ] ],
        password:  ['', [ Validators.required, Validators.minLength(6) ] ],
        confirmPassword: ['', Validators.required]
      },{
        validator : CustomValidator.MustMatch('password', 'confirmPassword')
      });
  } 

  upFormUser() {
      this.createUserForm = this.formBuilder.group({
      username: [this.datas['username'], [ Validators.required ] ],
      email:  [this.datas['email'], [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:  [this.datas['password'], [ Validators.required, Validators.minLength(6) ] ],
      confirmPassword: ['', Validators.required]
    },{
      validator : CustomValidator.MustMatch('password', 'confirmPassword')
    });
  } 


// Méthode d'initialisation de tous les autres formulaires (appelée lors de la création du formulaire)
  addChampForm() {
    
    this.ch.forEach((val: any) => {
        if(val.validator === undefined){
          let group = new FormGroup({});
          group.addControl(val.nom, new FormControl('', Validators.required));
          this.champForm.push(group);
        }
        else{
          let group = new FormGroup({});
          group.addControl(val.nom, new FormControl('', val.validator ));        
          this.champForm.push(group);
        }
      
    })
   
  }

  // Méthode d'initialisation de tous les autres formulaires (appelée lors de la modification du formulaire)
  upChampForm() {

    this.ch.forEach((val: any) => {
      if(val.validator === undefined){
        let group = new FormGroup({});
        group.addControl(val.nom, new FormControl(this.datas[val.nom]));
        this.champForm.push(group);
      }
      else{
        let group = new FormGroup({});
        group.addControl(val.nom, new FormControl(this.datas[val.nom], val.validator ));        
        this.champForm.push(group);
      }
    })
      
  }

  // Permet de filtrer le tableau d'occurence dans le html
  filtreOccurence(tab:string) {
    return this.occur.filter( x => x.chForm == tab )
  }

// Créé le formulaire vide pour ajout
  cr() {
      this.updating = false;
      this.creating = true;
      this.create_success = false;
      this.navSideButton = false;
      this.blockNavSideButton.emit(this.navSideButton);

      if(this.selectedTable === 'user'){
        this.initFormUser();   
        }
        
       else {

          this.createForm = this.formBuilder.group({
            champForm: this.formBuilder.array([])
          });
       
          this.addChampForm();
      } 
  }

  // Enregistre les données saisies du formulaire  (création)
  create() {
    this.create_submitted = true;
   
    // Si nouvel utilisateur
    if (this.selectedTable === 'user') {
      if (this.createUserForm.invalid ) {
        return;
      }

      const data = this.createUserForm?.value
      this.adminService.createUser(data)
      .subscribe({
        next: (res) => { 
          this.create_success = true;
          this.datasSub = this.adminService.getAllDatas(this.selectedTable,this.l,this.a,this.c).subscribe(datas => {
            this.columnDefs =  datas[1];
            this.rowData = datas[0];
          });
        },
        error: (e) => console.error(e)
      });  


      // Sinon toutes les autres tables
    }else {

      if (this.createForm.invalid) {
        return;
      }

      const data = this.champForm?.value;
    
      this.adminService.createData(this.selectedTable,data)
          .subscribe({
            next: (res) => { 
              this.create_success = true;
              this.datasSub = this.adminService.getAllDatas(this.selectedTable,this.l,this.a,this.c).subscribe(datas => {
                this.columnDefs =  datas[1];
                this.rowData = datas[0];
              });
            },
            error: (e) => console.error(e)
          });  
    } 
    
  }

  // Créé le formulaire rempli pour modification
  up() {

    this.navSideButton = false;
    this.blockNavSideButton.emit(this.navSideButton);
    this.creating = false;
    this.updating = true;
    this.update_success = false;

    if(this.selectedTable === 'user'){

      this.upFormUser();
    
      }
      

     else {

        this.createForm = this.formBuilder.group({
          champForm: this.formBuilder.array([])
      });
      
      this.upChampForm();
console.log(this.champForm)
    }
  }

// Enregistre les données saisies du formulaire (modification)
  update() {
    this.update_submitted = true;
    const id = this.datas.id;

 // Si table utilisateur
    if(this.selectedTable === 'user'){

      if (this.createUserForm.invalid ) {
        return;
      }
      const data = this.createUserForm?.value;
      delete data.confirmPassword;
     
        this.adminService.updateUser(id,data)
        .subscribe({
          next: (res) => { 
            this.update_success = true;
            this.datasSub = this.adminService.getAllDatas(this.selectedTable,this.l,this.a,this.c).subscribe(datas => {
              this.columnDefs =  datas[1];
              this.rowData = datas[0];
            });
          },
          error: (e) => console.error(e)
        });  

// Sinon toutes les autres tables
    } else {

      if (this.createForm.invalid) {
        return;
      }
      const data = this.champForm?.value;

      this.adminService.updateData(this.selectedTable,id,data)
        .subscribe({
          next: (res) => { 
            this.update_success = true;
            this.datasSub = this.adminService.getAllDatas(this.selectedTable,this.l,this.a,this.c).subscribe(datas => {
              this.columnDefs =  datas[1];
              this.rowData = datas[0];
            });
          },
          error: (e) => console.error(e)
        });  
    }
    
  }

  // Méthode pour suppression de la ligne sélectionnée
  delete() {
      
      let id = this.datas.id    
      this.adminService.deleteData(this.selectedTable,id).subscribe({
        next: (res) => {
        
          this.datasSub = this.adminService.getAllDatas(this.selectedTable,this.l,this.a,this.c).subscribe(datas => {
            this.columnDefs =  datas[1];
            this.rowData = datas[0];
          });
        },
        error: (e) => console.error(e)
        
      });;
         
  }

  // Retour au tableau de table
  return_dashboard(){
   
    this.creating = false;
    this.updating = false;
    this.selected = false;
    this.navSideButton = true;
    this.blockNavSideButton.emit(this.navSideButton);
  }
  


}
