import { Materia } from "./materia.interface";

export interface Profesor {
    id: number;
    nombre: string;
    ap_paterno: string;
    ap_materno: string;
    materias?: Array<Materia>;
}
