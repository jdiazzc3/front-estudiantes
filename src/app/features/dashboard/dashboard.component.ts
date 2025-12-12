import { Component } from '@angular/core';
import { TablaEstudiantesComponent } from '../../shared/tabla-estudiantes/tabla-estudiantes.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TablaEstudiantesComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

}
