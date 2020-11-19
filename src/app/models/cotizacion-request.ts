export interface CotizacionRequest {
  id_cotizacion: number;
  fecha_coti: string;
  id_ter_cli: string;
  id_ter_emp: string;
  especificacion_tec: string;
  validez_oferta: string;
  observacion: string;
  menu_madoco: number;
  metodo_pago?: string;
  id_tyc_fk?: number;
}
