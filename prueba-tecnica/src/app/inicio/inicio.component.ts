import { Component, OnInit, ViewChild } from '@angular/core';
import { PantallaEsperaComponent } from '../util/pantalla-espera/pantalla-espera.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{

  protected modules: any = [];

  protected tareas: any;
  protected dataEdicion: any;
  
  protected moduloActual: number;
  
  @ViewChild(PantallaEsperaComponent, {static: false}) pantallaEspera: PantallaEsperaComponent | undefined;
  
  constructor(){
    this.modules = [
      true,
      false,
      false
    ];
    this.moduloActual = 0;
  }

  ngOnInit(): void {
    setTimeout(() =>{
      this.pantallaEspera?.activarModoEspera();
    });
    
    setTimeout(() =>{
      this.pantallaEspera?.desactivarModoEspera();
    }, 500);
  }

  protected reiniciarValores(){
    this.dataEdicion = [];
  }

  protected abrirModulo(i: number, bandera: boolean = true){
    this.pantallaEspera?.activarModoEspera();
    this.reiniciarValores();
    setTimeout(() =>{
      this.modules[this.moduloActual] = false;
      this.modules[i] = true;
      this.moduloActual = i;

      if(!bandera){
        this.pantallaEspera?.desactivarModoEspera();
      }
    });
  }

}
