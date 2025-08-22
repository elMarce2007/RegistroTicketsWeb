import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TecnicosApiService } from '../../service/tecnicos-api.service';
import { Tecnico } from '../../models/tecnicos.interface';

@Component({
  selector: 'app-tecnicos-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tecnicos-list.component.html',
})
export class TecnicosListComponent implements OnInit {
  tecnicos: Tecnico[] = [];
  loading = false;

  constructor(private tecnicosApi: TecnicosApiService) {}

  ngOnInit(): void {
    this.cargarTecnicos();
  }

  cargarTecnicos() {
    this.loading = true;
    this.tecnicosApi.listar().subscribe({
      next: (data) => {
        this.tecnicos = data;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  eliminar(id?: number) {
    if (!id) return;
    if (confirm('¿Seguro que quieres eliminar este técnico?')) {
      this.tecnicosApi.eliminar(id).subscribe(() => this.cargarTecnicos());
    }
  }
}
