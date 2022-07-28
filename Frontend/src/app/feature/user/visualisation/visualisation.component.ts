import { Component, OnInit } from '@angular/core';
import { ColumnApi, GridApi, GridReadyEvent, SelectionChangedEvent } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { Champs } from 'src/app/core/models/admin';
import { CommonService } from 'src/app/core/services/common.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['./visualisation.component.css']
})
export class VisualisationComponent implements OnInit {
  

  constructor( private userService: UserService, private commonService: CommonService) { }

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
  datasSub!: Subscription;
  columnDefs : any;
  rowData: any;
  liens!: any;
  attributes!: any;
  cols!: any;
  champs!: any;
  l!: string;
  a!: string;
  c!: string;
  ch!: Champs[];

  ngOnInit(): void {

    this.liens = this.userService.liens;
    this.attributes = this.userService.attributes;
    this.cols = this.userService.cols;
    this.champs= this.userService.champs;

      // Valeurs récupérées dans le service pour mise en forme des datas
      const lien = this.commonService.getValueByKey(this.liens,'tableau_bord');
      this.l = lien !== undefined ? lien : '';
      const attribute = this.commonService.getValueByKey(this.attributes,'tableau_bord');
      this.a = attribute !== undefined ? attribute : '';
      const column = this.commonService.getValueByKey(this.cols,'tableau_bord');
      this.c = column !== undefined ? column : '';

       // Valeurs des champs de formulaire de la table envoyées dans le component enfant
    const champs = this.commonService.getValueByKey(this.champs,'tableau_bord');
    this.ch = champs !== undefined ? champs : '';

    this.datasSub = this.userService.getAllDatas('tableau_bord',this.l,this.a,this.c).subscribe(datas => {
      this.columnDefs =  datas[1];
      this.rowData = datas[0];
    });
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

  
}
