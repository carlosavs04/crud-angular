import { Profesor } from "./profesor.interface";
export interface Materia {
    id: number;
    nombre: string;
    profesores: Array<Profesor>
}
