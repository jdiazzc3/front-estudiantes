import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../../core/services/estudiante.service';
import { Estudiante } from '../../core/models/estudiante.model';
import { FormularioEstudianteComponent } from '../formulario-estudiante/formulario-estudiante.component';

@Component({
  selector: 'app-tabla-estudiantes',
  standalone: true,
  imports: [CommonModule, FormularioEstudianteComponent],
  templateUrl: './tabla-estudiantes.component.html',
  styleUrls: ['./tabla-estudiantes.component.css']
})
export class TablaEstudiantesComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  estudianteSeleccionado: Estudiante | null = null;
  modoEdicion = false;
  cargando = false;
  error = '';
  mostrarModal = false;

  constructor(
    private estudianteService: EstudianteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes(): void {
    this.cargando = true;
    this.error = '';
    
    console.log('Cargando estudiantes...');
    this.estudianteService.obtenerTodos().subscribe({
      next: (response) => {
        console.log('Respuesta recibida:', response);
        this.estudiantes = [...response.data];
        console.log('Estudiantes asignados:', this.estudiantes);
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error completo:', err);
        this.error = 'Error al cargar los estudiantes: ' + (err.message || 'Error desconocido');
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  abrirModalCrear(): void {
    this.estudianteSeleccionado = null;
    this.modoEdicion = false;
    this.mostrarModal = true;
    this.error = '';
  }

  abrirModalEditar(estudiante: Estudiante): void {
    this.estudianteSeleccionado = { ...estudiante };
    this.modoEdicion = true;
    this.mostrarModal = true;
    this.error = '';
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.estudianteSeleccionado = null;
    this.modoEdicion = false;
    this.error = '';
  }

  onGuardarEstudiante(estudiante: Estudiante): void {
    this.cargando = true;
    
    if (this.modoEdicion && this.estudianteSeleccionado?.id) {
      // Actualizar
      this.estudianteService.actualizar(this.estudianteSeleccionado.id, estudiante).subscribe({
        next: (response) => {
          const index = this.estudiantes.findIndex(e => e.id === response.data.id);
          if (index !== -1) {
            this.estudiantes[index] = response.data;
          }
          this.cerrarModal();
          this.cargando = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error = 'Error al actualizar el estudiante';
          this.cargando = false;
          this.cdr.detectChanges();
          console.error(err);
        }
      });
    } else {
      // Crear
      this.estudianteService.crear(estudiante).subscribe({
        next: (response) => {
          this.estudiantes.push(response.data);
          this.cerrarModal();
          this.cargando = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error = 'Error al crear el estudiante';
          this.cargando = false;
          this.cdr.detectChanges();
          console.error(err);
        }
      });
    }
  }

  eliminarEstudiante(id: number | undefined): void {
    if (!id) return;

    if (!confirm('¿Está seguro de eliminar este estudiante?')) return;

    this.cargando = true;
    this.estudianteService.eliminar(id).subscribe({
      next: () => {
        this.estudiantes = this.estudiantes.filter(e => e.id !== id);
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al eliminar el estudiante';
        this.cargando = false;
        this.cdr.detectChanges();
        console.error(err);
      }
    });
  }
}
