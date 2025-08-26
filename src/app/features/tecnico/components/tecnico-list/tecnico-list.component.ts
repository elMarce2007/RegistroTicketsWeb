import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TecnicoApiService } from '../../services/tecnico-api.service';
import { Tecnico } from '../../models/tecnico.interface';

@Component({
  selector: 'app-tecnico-list',
  standalone: true,
  templateUrl: './tecnico-list.component.html'
})
export class TecnicoListComponent implements OnInit {
  tecnicos = signal<Tecnico[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private tecnicoService: TecnicoApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.tecnicoService.getAll().subscribe({
      next: (data) => {
        this.tecnicos.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar los técnicos');
        this.loading.set(false);
      }
    });
  }

  goToCreate(): void {
    this.router.navigate(['/tecnicos/nuevo']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/tecnicos/editar', id]);
  }

  delete(id: number): void {
    if (confirm('¿Está seguro de eliminar este técnico?')) {
      this.tecnicoService.delete(id).subscribe(() => this.loadData());
    }
  }
}
