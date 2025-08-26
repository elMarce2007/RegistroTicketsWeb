// src/app/features/tecnico/models/tecnico.interface.ts
/**
 * Representa la entidad Técnico usada por el backend.
 */
export interface Tecnico {
  id?: number;
  nombreTecnico: string;
  especialidadTecnico: string;
  usuarioCreacion: string;
  fechaCreacion?: string | null;
  usuarioActualizacion?: string | null;
  fechaActualizacion?: string | null;
}
