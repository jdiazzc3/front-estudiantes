import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Estudiante } from '../../core/models/estudiante.model';

@Component({
  selector: 'app-formulario-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-estudiante.component.html',
  styleUrls: ['./formulario-estudiante.component.css']
})
export class FormularioEstudianteComponent implements OnInit {
  @Input() estudiante: Estudiante | null = null;
  @Input() modoEdicion = false;
  @Output() guardar = new EventEmitter<Estudiante>();
  @Output() cancelar = new EventEmitter<void>();

  formulario: Estudiante = {
    nombre: '',
    apellido: ''
  };

  ngOnInit(): void {
    if (this.estudiante) {
      this.formulario = { ...this.estudiante };
    }
  }

  onSubmit(): void {
    if (!this.formulario.nombre || !this.formulario.apellido) {
      return;
    }
    this.guardar.emit(this.formulario);
  }

  onCancelar(): void {
    this.cancelar.emit();
  }
}
