import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.scss']
})
export class TarjetaComponent {

  @Input() nombre: string = '';
  @Input() descripcion: string = '';
  @Input() fechaEjecucion: string = '';
  @Input() imagen: string = '';


  public get tiempoRestante() {
    return Math.ceil((new Date(this.fechaEjecucion).getTime() - Date.now()) / (1000 * 3600 * 24));
  }

}
