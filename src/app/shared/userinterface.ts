export interface User{
    uid: string;
    email: string;
    displayName: string;
    emailVerified: boolean;
}

export interface Usuario{
    nombre: string;
    apellidoP: string;
    apellidoM: string;
    correo: string;
    password: string;
    telefono: number;
    fechaNac: Date;
    tipoU: string;
}

export interface Habitacion{
    id: string;
    numero: number;
    edificio: string;
    piso: string;
    capacidadA: number;
    capacidadM: number;
    tipo: string;
    numeroCama: number;
    tipoCama: string;
}