export interface SuppliesRequest {
  id: string;
  item: string;
  valor_unitario: string;
  observaciones: string;
  id_unidad?: number;
  stock: string;
  stock_min: string;
  stock_max: string;
  num_lote?: any;
}
