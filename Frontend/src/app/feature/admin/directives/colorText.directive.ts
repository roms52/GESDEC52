import { Directive, ElementRef, HostListener, Input, Renderer2, RendererFactory2 } from '@angular/core';

@Directive({
  selector: '[appColorText]'
})
export class ColorTextDirective {

    id!: string;
    tab! : {nom: string, rendu: string}[];
   

    constructor(private renderer: Renderer2,private el: ElementRef) {
    }


    @HostListener('click') onClick() {

      let btn = document.querySelectorAll('.menu-button-side');

        btn.forEach((val:any) => {
          this.renderer.setAttribute(val,"style","color : white;");
        })


          this.el.nativeElement.style.color = '#f39423';    
      
    }
   

}