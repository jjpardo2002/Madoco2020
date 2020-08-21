export interface MiEncuestas {
  id: number;
  pregunta: string;
  id_enc_fk: number;
  tipo_pre: number;
  rtas: Rta[];
}

interface Rta {
  id_rta: number;
  id_pre_fk: number;
  descripcion_rta: string;
}
