export class Usuario {
    idUsuario!: number;
    nombre!: String;
    apellido!: String;
    correo!: String;
    contrasena!: String;
    telefono!: number;
    direcion!: String;
    cedula!: number;
    foto!: String;
    fecharegistro!: Date;
    idRol!: number;
}

export class Rol{
    idRol!: number;
    nombre!: String;
}


export class Categoria {
    id!: number;
    nombre!: String;
    descripcion!: String;
    imagen!: String;
}


export class Producto{
    idProducto!: number;
    nombre!: String;
    marca!: String;
    modelo!: String;
    descripcion!: String;
    idCategoria!: number;
    fechainicio!: Date;
    fechafinalizacion!: String;
    precioBase!: number;
    precioActual!: number;
    foto!: String;
    idUsuario!: number;
}


export class Oferta{
    idOferta!: number;
    idUsuario!: number;
    idProducto!: number;
    precio !: number;
    idEstado!: number;
    fecha!: Date;
}


export class Estado{
    idEstado!: number;
    nombre!: String;
}


export class Envio{
    idEnvio!: number;
    idOferta!: number;
    codigoPostal!: number;
    barrio!: String;
    ciudad!: String;
    direccion!: String;
    referencia!: String;
    latitud!: String;
    Longitud!: String;
}

export class Coordenada{
    latitud!: number;
    longitud!: number;
    constructor(lat: number, long:number){
        this.latitud = lat;
        this.longitud = long;
    }
}