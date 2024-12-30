import {
  afterNextRender,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GestionService } from '../services/gestion.service';
import { PantallaEsperaComponent } from '../util/pantalla-espera/pantalla-espera.component';
declare var window: any;

@Component({
  selector: 'app-creacion-tareas',
  templateUrl: './creacion-tareas.component.html',
  styleUrls: ['./creacion-tareas.component.css'],
})
export class CreacionTareasComponent implements OnInit {
  @Input() dataEdicion: any;
  @Output() desplegarMenuPrincipal = new EventEmitter();
  @Output() desplegarListaTareas = new EventEmitter();

  protected formularioTarea: FormGroup;
  protected modalAlerta: any;

  protected habilitarGuardarTarea: boolean;

  @ViewChild(PantallaEsperaComponent, { static: false }) pantallaEspera:
    | PantallaEsperaComponent
    | undefined;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private servicioTareas: GestionService
  ) {
    afterNextRender(() => {
      this.modalAlerta = new window.bootstrap.Modal(
        document.getElementById('modalAlerta'),
        {
          keyboard: false,
          backdrop: 'static',
        }
      );
    });

    this.formularioTarea = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
    });

    this.habilitarGuardarTarea = false;
  }

  ngOnInit(): void {
    this.validarInicial();
  }

  openModal() {
    this.modalAlerta.show();
  }

  protected validarInicial() {
    this.pantallaEspera?.activarModoEspera();

    setTimeout(() => {
      this.pantallaEspera?.desactivarModoEspera();
    }, 100);
  }

  protected setFormulario() {
    this.t['titulo'].setValue(this.dataEdicion.titulo);
    this.t['descripcion'].setValue(this.dataEdicion.descripcion);

    setTimeout(() => {
      this.pantallaEspera?.desactivarModoEspera();
    }, 100);
  }

  protected validarFormularioTarea() {
    if (this.formularioTarea.valid) {
      this.habilitarGuardarTarea = true;
    } else {
      this.habilitarGuardarTarea = false;
    }
  }

  protected guardarTarea() {
    this.pantallaEspera?.activarModoEspera();
    this.consolidarInformacion();
  }

  protected consolidarInformacion() {
    var data: any;
    data = this.formularioTarea.value;

    let promesa: any;
    promesa = this.servicioTareas.addTask(data);

    promesa
      .then(() => {
        this.snackBar.open('Tarea registrada correctamente', 'Cerrar', {
          duration: 4000,
        });
        this.formularioTarea.reset();
        this.habilitarGuardarTarea = false;
        setTimeout(() => {
          this.pantallaEspera?.desactivarModoEspera();
        }, 100);
      })
      .catch(() => {
        this.snackBar.open('Error al registrar la tarea', 'Cerrar', {
          duration: 4000,
        });
        setTimeout(() => {
          this.pantallaEspera?.desactivarModoEspera();
        }, 100);
      });
  }

  get t() {
    return this.formularioTarea.controls;
  }

  protected volver() {
    this.desplegarMenuPrincipal.emit();
  }
}
