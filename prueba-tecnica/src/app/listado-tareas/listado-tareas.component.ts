import {
  afterNextRender,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { GestionService } from '../services/gestion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PantallaEsperaComponent } from '../util/pantalla-espera/pantalla-espera.component';
declare var window: any;

@Component({
  selector: 'app-listado-tareas',
  templateUrl: './listado-tareas.component.html',
  styleUrls: ['./listado-tareas.component.css'],
})
export class ListadoTareasComponent implements OnInit {
  @Output() desplegarMenuPrincipal = new EventEmitter();
  @Output() abrirEdicionTarea = new EventEmitter();

  protected tareas: any;
  protected modalAlerta: any;

  isAmpliado: boolean = false;
  protected rerender: boolean;

  protected idEliminar: number | undefined;

  @ViewChild(PantallaEsperaComponent, { static: false }) pantallaEspera:
    | PantallaEsperaComponent
    | undefined;

  constructor(private tareasService: GestionService, private snackBar: MatSnackBar) {

    this.rerender = false;

    afterNextRender(() => {
      this.modalAlerta = new window.bootstrap.Modal(
        document.getElementById('modalAlerta'),
        {
          keyboard: false,
          backdrop: 'static',
        }
      );
    });
  }

  ngOnInit(): void {
    this.obtenerTareas();
  }

  protected obtenerTareas() {
    this.tareasService.getTasks().subscribe({
      next: (resp: any) => {
        this.tareas = resp;
        setTimeout(() => {
          this.rerender = true;
          this.pantallaEspera?.desactivarModoEspera();
        }, 100);
      },
      error: (e: any) => {
        setTimeout(() => {
          this.rerender = true;
          this.pantallaEspera?.desactivarModoEspera();
        }, 100);
      },
    });
  }

  protected eliminarTarea() {
    let promesa: any;
    promesa = this.tareasService.deleteTask(this.idEliminar!);

    promesa
      .then(() => {
        this.snackBar.open('Tarea eliminada correctamente', 'Cerrar', {
          duration: 4000,
        });
        setTimeout(() => {
          this.obtenerTareas();
          this.pantallaEspera?.desactivarModoEspera();
        }, 100);
      })
      .catch(() => {
        this.snackBar.open('Error al eliminar la tarea', 'Cerrar', {
          duration: 4000,
        });
        setTimeout(() => {
          this.pantallaEspera?.desactivarModoEspera();
        }, 100);
      });
  }

  openModal(i: number) {
    this.idEliminar = i;
    this.modalAlerta.show();
  }

  protected volver() {
    this.desplegarMenuPrincipal.emit();
  }

}
