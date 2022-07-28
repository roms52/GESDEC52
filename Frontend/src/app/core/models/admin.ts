import { Validators } from "@angular/forms";

export class Champs {

   public nom!: string;
   public rendu!: string;
   public type!: string;
   public tab_lie!: string;
   public nom_lie!: string;
   public occ!: string;
   public validator!: Validators;

    constructor(obj: any) {
        Object.assign(this,obj);
    }
}