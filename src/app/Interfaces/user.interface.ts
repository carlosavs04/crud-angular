export interface User {
    id: number;
    name: string;
    ap_paterno: string;
    ap_materno: string;
    email: string;
    telefono: string;
    password: string;
    password_confirmation: string;
    active?: number; 
    rol_id: number;
    rol?: string;
    codigo?: string;
}
