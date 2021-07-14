import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-editar-actividad',
  templateUrl: './editar-actividad.component.html',
  styleUrls: ['./editar-actividad.component.scss']
})
export class EditarActividadComponent implements OnInit {

  public usuarios: any[] = [];
  public actividadForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
    fechaEjecucion: new FormControl('', Validators.required),
    usuario: new FormControl('', Validators.required),
  });

  constructor(
    private usuarioService: UsuarioService,
    private tarjetaService: TarjetaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.usuarioService.get().subscribe((usuarios: any[]) => {
      this.usuarios = usuarios;
    });
    if (this.data) {
      this.actividadForm.controls.nombre.setValue(this.data.nombre);
      this.actividadForm.controls.descripcion.setValue(this.data.descripcion);
      this.actividadForm.controls.fechaEjecucion.setValue(this.data.fechaEjecucion);
      this.actividadForm.controls.usuario.setValue(this.data.usuario.id);
    }
  }

  public guardar(): void {
    let body = this.actividadForm.value;
    body.estado = 'pendiente';
    body.usuario = this.usuarios.find((usuario: any) => usuario.id == body.usuario);

    if (this.data) {
      body.id = this.data.id;
    }

    this.tarjetaService.post(body).subscribe();
  }

}
