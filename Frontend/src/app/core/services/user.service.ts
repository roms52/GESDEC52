import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';


const API_URL = 'http://localhost:8084/api/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


// Préparation des tables, liens pour jointures, attributs et colonnes pour affichage dans l'admin

  liens = {tableau_bord: "[{model:db.marche,attributes:[]},{model:db.bpu,attributes:[]},{model:db.type_tarif_pn,attributes:[]},{model:db.prestataire,attributes:[]},\
                {model:db.dechetterie,attributes:[]},{model:db.flux,attributes:[]},{model:db.prestation,attributes:[]},{model:db.facture,attributes:[]},\
                {model:db.dechetterie,as:'dechetterie_init',attributes:[]},{model:db.flux,as:'flux_init',attributes:[]},{model:db.unite,attributes:[]}]"}


  attributes = {tableau_bord: "['id', 'date_prestation','mois_prestation','annee_prestation','id_marche', [Sequelize.col('marche.ref_marche'),'ref_marche'],\
                      'id_bpu','id_typ_tarif_pn', [Sequelize.col('type_tarif_pn.tarif_typ'),'tarif_typ'],'id_prestataire', \
                      [Sequelize.col('prestataire.nom_prestataire'),'nom_prestataire'], 'id_dechetterie', [Sequelize.col('dechetterie.nom_dechetterie'),\
                      'nom_dechetterie'], 'id_flux', [Sequelize.col('flux.nom_flux'),'nom_flux'],[Sequelize.col('flux.sous_flux'),'sous_flux'], 'id_prestation',\
                      [Sequelize.col('prestation.nom_prestation'),'nom_prestation'],'quantite','id_unite',[Sequelize.col('unite.nom_unite'),'nom_unite'],\
                      'tarif_pn', 'cout_pn', 'tarif_p0','cout_p0','controle_quantite','controle_prix','tva','id_facture',\
                      [Sequelize.col('facture.num_facture'),'num_facture'], 'id_dechetterie_init',[Sequelize.col('dechetterie_init.nom_dechetterie'),\
                      'nom_dechetterie_init'], 'id_flux_init',[Sequelize.col('flux_init.nom_flux'),'nom_flux_init'], 'quantite_init']"}


  cols= {tableau_bord: "[{field:'ref_marche',headerName: 'Ref. Marché'},{field:'nom_prestataire',headerName: 'Prestataire'},\
                    {field:'nom_prestation',headerName: 'Prestation'},{field:'date_prestation',headerName: 'Date Presta'},{field:'mois_prestation',headerName: 'Mois'},\
                    {field:'annee_prestation',headerName: 'Année'},{field:'nom_dechetterie',headerName: 'Déchetterie'},{field:'nom_flux',headerName: 'Flux'},\
                    {field:'sous_flux',headerName: 'Sous_flux'},{field:'quantite',headerName: 'Quantité'},{field:'nom_unite',headerName: 'Unité'},\
                    {field:'cout_p0',headerName: 'P0'},{field:'cout_pn',headerName: 'Pn'},{field:'num_facture',headerName: 'Facture'}]"}



  champs= {tableau_bord: [ {nom:'id_marche',rendu: 'Ref. Marché',type:'select',tab_lie:'marche',nom_lie:'ref_marche',occ:"['id','ref_marche']"},
                  {nom:'id_prestataire',rendu: 'Nom Prestataire',type:'select',tab_lie:'prestataire',nom_lie:'nom_prestataire',occ:"['id','nom_prestataire']"},
                  {nom:'date_prestation',rendu: 'Date Presta',type:'date'},
                  {nom:'mois_prestation',rendu: 'Mois',type:'date'},
                  {nom:'annee_prestation',rendu: 'Annee',type:'date'},
                  {nom:'id_dechetterie',rendu: 'Déchetterie',type:'select',tab_lie:'dechetterie',nom_lie:'nom_dechetterie',occ:"['id','nom_dechetterie']"},
                  {nom:'id_flux',rendu: 'Flux',type:'select',tab_lie:'flux',nom_lie:'nom_flux', sous_nom_lie:'sous_flux',occ:"['id','nom_flux','sous_flux']"},
                  {nom:'id_prestation',rendu: 'Prestation',type:'select',tab_lie:'prestation',nom_lie:'nom_prestation',occ:"['id','nom_prestation']"},
                  {nom:'quantite',rendu: 'Quantité',type:'number'},
                  {nom:'id_unite',rendu: 'Unité',type:'select',tab_lie:'unite',nom_lie:'nom_unite',occ:"['id','nom_unite']"},
                  {nom:'cout_p0',rendu: 'P0',type:'number'},
                  {nom:'cout_pn',rendu: 'Pn',type:'number'},
                  {nom:'id_facture',rendu: 'Facture',type:'select',tab_lie:'facture',nom_lie:'num_facture',occ:"['id','num_facture']"}
                ]}
  
        
          
        
// Fonctions pour CRUD backend (Create,Read,Update,Delete) pour toutes les tables

  getAllDatas(table:string,lien: string, attribute: string, column: string): Observable<any>{
    return this.http.get<[]>(`${API_URL}/${table}?lien=${lien}&attr=${attribute}&col=${column}`)
   }

   deleteData(table:string, id:string): Observable<any>{
    return this.http.delete<[]>(`${API_URL}/${table}/${id}`)
   }
  
   createData(table:string,data:any){
    return this.http.post(`${API_URL}/${table}`,data) 
   }

   updateData(table:string,id:number,data:any){
    return this.http.post(`${API_URL}/${table}/${id}`,data) 
   }

 
  
}

