import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../models/estudiante.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private apiUrl = 'http://localhost:8080/api/estudiantes';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los estudiantes
   */
  obtenerTodos(): Observable<ApiResponse<Estudiante[]>> {
    return this.http.get<ApiResponse<Estudiante[]>>(this.apiUrl);
  }

  /**
   * Crea un nuevo estudiante
   */
  crear(estudiante: Estudiante): Observable<ApiResponse<Estudiante>> {
    return this.http.post<ApiResponse<Estudiante>>(this.apiUrl, estudiante);
  }

  /**
   * Actualiza un estudiante existente
   */
  actualizar(id: number, estudiante: Estudiante): Observable<ApiResponse<Estudiante>> {
    return this.http.put<ApiResponse<Estudiante>>(`${this.apiUrl}/${id}`, estudiante);
  }

  /**
   * Elimina un estudiante por ID
   */
  eliminar(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }
}
