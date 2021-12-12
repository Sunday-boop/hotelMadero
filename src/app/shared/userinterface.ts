export interface User{
    uid: string;
    email: string;
    displayName: string;
    emailVerified: boolean;

}

export interface Roles{
    admin: boolean;
    recepcionista: boolean;
    apoyo: boolean;
    cliente: boolean;
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

export interface Precio{
    id: string;
    habitacion: string;
    date: number;
    precio: number;
    fecha: string;
}

export interface Reserva{
    checkIn: string;
    checkOut: string;
    correoCliente: string;
    estado: string;
    fechaRealizacion: string;
    idReserva: string;
    idUsuario: string;
    monto: number;
    nombreCliente: string;
    numeroTarjeta: string;
    telefonoCliente: number;
    titularTarjeta: string;
}