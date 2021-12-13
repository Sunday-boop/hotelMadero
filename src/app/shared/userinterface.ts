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
    descripcion: string;
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
    checkInInt: number;
    checkOut: string;
    checkOutInt: number;
    correoCliente: string;
    estado: string;
    fechaRealizacion: string;
    habitacion: number;
    idReserva: string;
    idUsuario: string;
    monto: number;
    nombreCliente: string;
    numeroTarjeta: number;
    telefonoCliente: number;
    titularTarjeta: string;
}