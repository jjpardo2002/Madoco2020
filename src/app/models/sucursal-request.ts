export interface SucursalRequest {
  nit: string;
  nit_empresa: string;
  fecha_registro: string;
  direccion: string;
  id_ciudad: string;
  id_localidad: number;
  nombre: string;
  created_at: string;
  updated_at?: string;
}
