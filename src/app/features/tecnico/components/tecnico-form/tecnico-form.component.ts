import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TecnicoApiService } from '../../services/tecnico-api.service';
import { Tecnico } from '../../models/tecnico.interface';
import {FormsModule} from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tecnico-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './tecnico-form.component.html'
})

export class TecnicoFormComponent implements OnInit {
  tecnico: Tecnico = {
    nombreTecnico: '',
    especialidadTecnico: '',
    usuarioCreacion: 'admin'
  };
  isEdit = false;

  constructor(
    private tecnicoService: TecnicoApiService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.tecnicoService.getById(+id).subscribe((data) => (this.tecnico = data));
    }
  }

  save(): void {
    if (this.isEdit && this.tecnico.id) {
      this.tecnicoService.update(this.tecnico.id, this.tecnico).subscribe(() => {
        this.router.navigate(['/tecnicos']);
      });
    } else {
      this.tecnicoService.create(this.tecnico).subscribe({
        next: () => {
          alert('Técnico creado correctamente');
          this.router.navigate(['/tecnicos']); // vuelve a la lista
        },
        error: (err) => console.error('Error al crear técnico', err)
      });
    }
  }

}
