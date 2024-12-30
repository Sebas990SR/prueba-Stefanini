import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Tarea } from '../interfaces/tarea';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  protected arregloTareas: any = [];
  private apiUrl = 'http://localhost:3000/tareas';

  constructor(private http: HttpClient) {
  }

  getTasks(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  addTask(task: Tarea): Promise<Tarea> {
    return firstValueFrom(this.http.post<Tarea>(this.apiUrl, task));
  }

  updateTask(id: number, updatedTask: Tarea): Promise<Tarea> {
    console.log(id, updatedTask);
    console.log(`${this.apiUrl}/${id}`);
    return firstValueFrom(this.http.put<Tarea>(`${this.apiUrl}/${id}`, updatedTask));
  }

  deleteTask(id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }

}
