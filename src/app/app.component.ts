import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditarActividadComponent } from './components/editar-actividad/editar-actividad.component';
import { TarjetaService } from './services/tarjeta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public tareasPendientes: any[] = [];

  public tareasRealizadas: any[] = [];

  constructor(
    private tarjetaService: TarjetaService,
    public dialog: MatDialog
  ) {
  }

  public openDialog(data?: any) {
    const dialogRef = this.dialog.open(EditarActividadComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTarjetas();
      }
    });
  }

  public ngOnInit() {
    this.getTarjetas();
  }

  private getTarjetas() {
    this.tarjetaService.get().subscribe((tarjetas: any[]) => {
      this.tareasPendientes = tarjetas.filter((tarjeta: any) =>
        tarjeta.estado == 'pendiente');
      this.tareasRealizadas = tarjetas.filter((tarjeta: any) =>
        tarjeta.estado == 'realizado');
    });
  }

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      let tarjeta = (event.container.data[event.currentIndex] as any);
      if (tarjeta.estado == "pendiente") {
        tarjeta.estado = "realizado";
      }
      else {
        tarjeta.estado = "pendiente";
      }

      this.tarjetaService.post(tarjeta).subscribe();
    }
  }

  public abrirTarjeta(tarea: any) {
    this.openDialog(tarea);
  }

  public eliminarTarjeta(tarea: any) {
    this.tarjetaService.delete(tarea.id).subscribe(() => {
      this.getTarjetas();
    });
  }
  
}
