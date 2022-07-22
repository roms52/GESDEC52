import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8084/api/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


// Préparation des tables, liens pour jointures, attributs et colonnes pour affichage dans l'admin

tables = [{nom: 'bpu', rendu: 'BPU'}, {nom: 'coeff_actu', rendu: 'Coeff Actu'}, {nom: 'dechetterie', rendu: 'Déchetterie'}, {nom: 'flux', rendu: 'Flux'},
             {nom: 'indice', rendu: 'Indice'}, {nom: 'marche', rendu: 'Marché'}, {nom: 'marche_indice0', rendu: 'Marché indice_0'},
            {nom: 'prestataire', rendu: 'Prestataire'}, {nom: 'prestation', rendu: 'Prestation'}, {nom: 'type_cout', rendu: 'Type de cout'},
             {nom: 'type_marche', rendu: 'Type de marché'}, {nom: 'type_tarif_pn', rendu: 'Type de tarif Pn'}];

  liens = {bpu: "[{model:db.marche,attributes:[]},{model:db.prestataire,attributes:[]},{model:db.dechetterie,attributes:[]},{model:db.flux,attributes:[]},\
                {model:db.prestation,attributes:[]},{model:db.marche,as:'marche_lie',attributes:[]}]",
          marche: "[{model:db.type_marche,attributes:[]},{model:db.type_cout,attributes:[]},{model:db.coeff_actu,attributes:[]},{model:db.type_tarif_pn,attributes:[]}]",
          marche_indice0: "[{model:db.marche,attributes:[]},{model:db.indice,attributes:[]}]"}


  attributes = {bpu: "['id', 'id_marche', [Sequelize.col('marche.ref_marche'),'ref_marche'], 'id_prestataire', [Sequelize.col('prestataire.nom_prestataire'),\
                      'nom_prestataire'], 'id_dechetterie', [Sequelize.col('dechetterie.nom_dechetterie'),'nom_dechetterie'], 'id_flux',\
                      [Sequelize.col('flux.nom_flux'),'nom_flux'], 'id_prestation', [Sequelize.col('prestation.nom_prestation'),'nom_prestation'],'tarif_p0',\
                      'tva', 'id_marche_lie', [Sequelize.col('marche_lie.ref_marche'),'ref_marche_lie']]",
                
                marche: "['id', 'ref_marche','id_typ_marche',[Sequelize.col('type_marche.marche_typ'),'marche_typ'],'montant_max','date_debut','date_fin',\
                'id_typ_cout',[Sequelize.col('type_cout.cout_typ'),'cout_typ'],'id_coeff_actu',[Sequelize.col('coeff_actu.req_maj_valeur'),'req_maj_valeur'],\
                'date_remise_offre','id_typ_tarif_pn', [Sequelize.col('type_tarif_pn.tarif_typ'),'tarif_typ'],'commentaire','inactif']",
                marche_indice0: "['id','id_marche', [Sequelize.col('marche.ref_marche'),'ref_marche'], 'id_indice', [Sequelize.col('indice.nom_indice'),'nom_indice']]",}


  cols= {bpu: "[{field:'ref_marche',headerName: 'Ref. Marché'},{field:'nom_prestataire',headerName: 'Nom Prestataire'},\
                {field:'nom_dechetterie',headerName: 'Déchetterie'},{field:'nom_flux',headerName: 'Flux'},{field:'nom_prestation',headerName: 'Prestation'},\
                {field:'tarif_p0',headerName: 'Tarif p0'},{field:'tva',headerName: 'TVA'},{field:'ref_marche_lie',headerName: 'Ref. Marché lié'}]",
        coeff_actu: "[{field:'req_maj_valeur',headerName: 'Formule MaJ'}]",
        dechetterie :"[{field:'nom_dechetterie',headerName: 'Déchetterie'},{field:'type_dechetterie',headerName: 'Type'}]",
        flux :"[{field:'nom_flux',headerName: 'Flux'},{field:'sous_flux',headerName: 'Sous_flux'}]",
        indice :"[{field:'nom_indice',headerName: 'Indice'},{field:'valeur_indice',headerName: 'Valeur'},\
                {field:'date_debut',headerName: 'Date début'},{field:'provisoire',headerName: 'Provisoire ?'}]",
        marche: "[{field:'ref_marche',headerName: 'Ref. Marché'},{field:'marche_typ',headerName: 'Type Marché'},\
                {field:'montant_max',headerName: 'Montant Max.'},{field:'date_debut',headerName: 'Date début'},{field:'date_fin',headerName: 'Date fin'},\
                {field:'cout_typ',headerName: 'Type cout'},{field:'req_maj_valeur',headerName: 'Formule MaJ'},\
                {field:'date_remise_offre',headerName: 'Date remise offre'},{field:'tarif_typ',headerName: 'Type tarif Pn'},\
                {field:'commentaire',headerName: 'Commentaire'},{field:'inactif',headerName: 'Inactif ?'}]", 
        marche_indice0: "[{field:'ref_marche',headerName: 'Ref. Marché'},{field:'nom_indice',headerName: 'Indice'}]" ,
        prestataire: "[{field:'nom_prestataire',headerName: 'Prestataire'},{field:'adresse',headerName: 'Adresse'},\
                {field:'cpostal',headerName: 'Code postal'},{field:'ville',headerName: 'Ville'},{field:'num_tel',headerName: 'Téléphone'},\
                {field:'num_fax',headerName: 'Fax'},{field:'mail',headerName: 'Mail'},{field:'rib',headerName: 'RIB'}]", 
        prestation :"[{field:'nom_prestation',headerName: 'Prestation'}]", 
        type_cout :"[{field:'cout_typ',headerName: 'Type cout'}]", 
        type_marche :"[{field:'marche_typ',headerName: 'Type marché'}]",
        type_tarif_pn :"[{field:'tarif_typ',headerName: 'Type tarif'}]"  }



  champs= {bpu: [ {nom:'id_marche',rendu: 'Ref. Marché',type:'select',tab_lie:'marche',nom_lie:'ref_marche',occ:"['id','ref_marche']"},
                  {nom:'id_prestataire',rendu: 'Nom Prestataire',type:'select',tab_lie:'prestataire',nom_lie:'nom_prestataire',occ:"['id','nom_prestataire']"},
                  {nom:'id_dechetterie',rendu: 'Déchetterie',type:'select',tab_lie:'dechetterie',nom_lie:'nom_dechetterie',occ:"['id','nom_dechetterie']"},
                  {nom:'id_flux',rendu: 'Flux',type:'select',tab_lie:'flux',nom_lie:'nom_flux',occ:"['id','nom_flux']"},
                  {nom:'id_prestation',rendu: 'Prestation',type:'select',tab_lie:'prestation',nom_lie:'nom_prestation',occ:"['id','nom_prestation']"},
                  {nom:'tarif_p0',rendu: 'Tarif p0',type:'number'},
                  {nom:'tva',rendu: 'TVA',type:'number'},
                  {nom:'id_marche_lie',rendu: 'Ref. Marché lié',type:'select',tab_lie:'marche',nom_lie:'ref_marche',occ:"['id','ref_marche']"}
                ],
          coeff_actu: [{nom:'req_maj_valeur',rendu: 'Formule MaJ',type:'text'}],
          dechetterie :[{nom:'nom_dechetterie',rendu: 'Déchetterie',type:'text'},
                        {nom:'type_dechetterie',rendu: 'Type',type:'text'}
                      ],
          flux :[ {nom:'nom_flux',rendu: 'Flux',type:'text'},
                  {nom:'sous_flux',rendu: 'Sous_flux',type:'text'}
                ],
          indice :[ {nom:'nom_indice',rendu: 'Indice',type:'text'},
                    {nom:'valeur_indice',rendu: 'Valeur',type:'number'},
                    {nom:'date_debut',rendu: 'Date début',type:'date'},
                    {nom:'provisoire',rendu: 'Provisoire ?',type:'boolean'}
                  ],
          marche: [ {nom:'ref_marche',rendu: 'Ref. Marché',type:'text'},
                    {nom:'id_typ_marche',rendu: 'Type Marché',type:'select',tab_lie:'type_marche',nom_lie:'marche_typ',occ:"['id','marche_typ']"},
                    {nom:'montant_max',rendu: 'Montant Max.',type:'number'},
                    {nom:'date_debut',rendu: 'Date début',type:'date'},
                    {nom:'date_fin',rendu: 'Date fin',type:'date'},
                    {nom:'id_typ_cout',rendu: 'Type cout',type:'select',tab_lie:'type_cout',nom_lie:'cout_typ',occ:"['id','cout_typ']"},
                    {nom:'id_coeff_actu',rendu: 'Formule MaJ',type:'select',tab_lie:'coeff_actu',nom_lie:'req_maj_valeur',occ:"['id','req_maj_valeur']"},
                    {nom:'date_remise_offre',rendu: 'Date remise offre',type:'date'},
                    {nom:'id_typ_tarif_pn',rendu: 'Type tarif Pn',type:'select',tab_lie:'type_tarif_pn',nom_lie:'tarif_typ',occ:"['id','tarif_typ']"},
                    {nom:'commentaire',rendu: 'Commentaire',type:'text'},
                    {nom:'inactif',rendu: 'Inactif ?',type:'boolean'}
                  ], 
          marche_indice0: [ {nom:'id_marche',rendu: 'Ref. Marché',type:'select',tab_lie:'marche',nom_lie:'ref_marche',occ:"['id','ref_marche']"},
                            {nom:'id_indice',rendu: 'Indice',type:'select',tab_lie:'indice',nom_lie:'nom_indice',occ:"['id','nom_indice']"}
                          ],
          prestataire: [  {nom:'nom_prestataire',rendu: 'Prestataire',type:'text'},
                          {nom:'adresse',rendu: 'Adresse',type:'text'},
                          {nom:'cpostal',rendu: 'Code postal',type:'number'},
                          {nom:'ville',rendu: 'Ville',type:'text'},
                          {nom:'num_tel',rendu: 'Téléphone',type:'text'},
                          {nom:'num_fax',rendu: 'Fax',type:'text'},
                          {nom:'mail',rendu: 'Mail',type:'text'},
                          {nom:'rib',rendu: 'RIB',type:'text'}
                        ], 
          prestation :[{nom:'nom_prestation',rendu: 'Prestation',type:'text'}], 
          type_cout :[{ nom:'cout_typ',rendu: 'Type cout',type:'text'}], 
          type_marche :[{nom:'marche_typ',rendu: 'Type marché',type:'text'}],
          type_tarif_pn :[{nom:'tarif_typ',rendu: 'Type tarif',type:'text'}]  }
   
        
// Fonction pour CRUD backend (Create,Read,Update,Delete)

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

  getAllUserRole(): Observable<any> {
    return this.http.get<[]>(`${API_URL}/user_role`)
  }

  getAllUser(): Observable<any> {
    return this.http.get<[]>(`${API_URL}/user`)
  }

  getAllRole(): Observable<any> {
    return this.http.get<[]>(`${API_URL}/allrole`);
  }

  createUser(data:any){
    return this.http.post(`${API_URL}/user`,data)
     
   }

   createUserRole(data:any){
    return this.http.post(`${API_URL}/user_role`,data)
     
   }

   updateUser(id:any,data:any){
    return this.http.post(`${API_URL}/user/${id}`,data)
     
   }

   updateUserRole(id:any,data:any){
    return this.http.post(`${API_URL}/user_role/${id}`,data)
     
   }

  deleteUser(id:any): Observable<any>{
    return this.http.delete(`${API_URL}/user/${id}`) 
  }

  deleteUserRole(id:any): Observable<any>{
    return this.http.delete(`${API_URL}/user_role/${id}`) 
  }
}




