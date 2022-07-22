import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColumnApi, GridApi, GridReadyEvent, SelectionChangedEvent } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/core/services/admin.service';
import { FormArray } from '@angular/forms';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-gestion-table',
  templateUrl: './gestion-table.component.html',
  styleUrls: ['./gestion-table.component.css']
})
export class GestionTableComponent implements OnInit {

  @Input() columnDefs : any;
  @Input() rowData: any;
  @Input() datasSub!: Subscription;
  @Input() selectedTable: any;
  @Input() l!: any;
  @Input() a!: any;
  @Input() c!: any;
  @Input() ch!: any;

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
console.log (this.datas)
  }

  onCellValueChanged(event: any) {

  }


 
// Méthode pour accès aux controls du formulaire (création et update)
  get champForm() {
    return this.createForm.controls['champForm'] as FormArray;
  }



// Méthode pour ajouter les controls du formulaire (appelée lors de la création du formulaire)
  addChampForm() {

    this.ch.forEach((val: any) => {

      let group = new FormGroup({});
      group.addControl(val.nom, this.formBuilder.control( "" ));
      this.champForm.push(group);
    })
   
  }

  upChampForm() {

    this.ch.forEach((val: any) => {

      let group = new FormGroup({});
      group.addControl(val.nom, this.formBuilder.control( this.datas[val.nom] ));
      this.champForm.push(group);
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

      this.createForm = this.formBuilder.group({
        champForm: this.formBuilder.array([])
    });
    
    this.addChampForm();

  }

  // Enregistre les données saisies du formulaire 
  create() {
    this.create_submitted = true;

    if (this.createForm.invalid) {
      return;
    }

    const data = this.champForm?.value;
    console.log (data)
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

  // Créé le formulaire rempli pour modification
  up() {

    this.creating = false;
    this.updating = true;
    this.update_success = false;

    this.createForm = this.formBuilder.group({
      champForm: this.formBuilder.array([])
  });
  
  this.upChampForm();

}


  update() {
    this.update_submitted = true;

    if (this.createForm.invalid) {
      return;
    }
    const id = this.datas.id;
    const data = this.champForm?.value;
    console.log (data)
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

  return_dashboard(){
   
    this.creating = false;
    this.updating = false;
    this.selected = false;
  }
  
}
